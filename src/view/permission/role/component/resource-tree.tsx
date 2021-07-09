import React, { FC, forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import message from 'antd/lib/message';
import { request } from '@/utility/request';
import { Resource } from '@/schema/resource';
import { helper } from '@/utility/helper';

interface ResourceTableProp {
	/**
	 * 所属角色id
	 */
	id: string;
	/**
	 * zTree对象
	 */
	ztree: any;
}

interface LevelResource extends Resource {
	/**
	 * 子级
	 */
	children: LevelResource[];
}

let resourceTree: any = null;

const mapToTree = (data: LevelResource[], current: Resource[]): any => {
	if (helper.isNullOrUndefined(data) || data.length === 0) {
		return undefined;
	} else {
		return data.map((item) => {
			return {
				...item,
				name: `${item.name}（${item.key}）`,
				children: mapToTree(item.children, current),
				checked: current.some((select) => select.id === item.id)
			};
		});
	}
};

const ResourceTreeBox = styled.div`
	width: auto;
	height: 200px;
	overflow-y: auto;
`;

forwardRef((props, ref) => {
	return <div></div>;
});

/**
 * 所属角色资源树
 */
const ResourceTree = forwardRef<any, ResourceTableProp>((props, ref) => {
	let { id, ztree } = props;

	useEffect(() => {
		(async () => {
			try {
				const [levelData, currentData] = await Promise.all([
					request<LevelResource[]>({ url: 'resource/level', method: 'GET' }),
					request<Resource[]>({ url: `resource/role/${id}`, method: 'GET' })
				]);
				if (levelData.code === 0 && currentData.code === 0) {
					resourceTree = ($.fn as any).zTree.init(
						$('#resourceTree'),
						{
							check: {
								enable: true,
								chkStyle: 'checkbox'
							},
							view: {
								showIcon: false
							}
						},
						mapToTree(levelData.data, currentData.data)
					);
					resourceTree.expandAll(true);
					ztree = resourceTree;
				} else {
					message.destroy();
					message.error(`查询资源数据失败`);
				}
			} catch (error) {
				message.destroy();
				message.error(`查询资源数据失败：${error.message}`);
			}
		})();
	}, []);

	return (
		<ResourceTreeBox>
			<ul id="resourceTree" className="ztree"></ul>
		</ResourceTreeBox>
	);
});

export { ResourceTree };

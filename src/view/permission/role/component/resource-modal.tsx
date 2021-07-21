import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import { request } from '@/utility/request';
import { Resource } from '@/schema/resource';
import { helper } from '@/utility/helper';

interface ResourceModalProp {
	/**
	 * 显示
	 */
	visible: boolean;
	/**
	 * 角色id
	 */
	id: string;
	/**
	 * 确定
	 */
	onOk: (data: ITreeNode[]) => void;
	/**
	 * 取消
	 */
	onCancel: () => void;
}

interface LevelResource extends Resource {
	/**
	 * 子级
	 */
	children: LevelResource[];
}

let resourceTree: any = null;

const ResourceTreeBox = styled.div`
	width: auto;
	height: 450px;
	overflow-y: auto;
`;

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

const ResourceModal: FC<ResourceModalProp> = (props) => {
	const { visible, id, onCancel, onOk } = props;

	useEffect(() => {
		(async (roleId) => {
			if (roleId !== '' && visible) {
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
					} else {
						message.destroy();
						message.error(`查询资源数据失败`);
					}
				} catch (error) {
					message.destroy();
					message.error(`查询资源数据失败：${error.message}`);
				}
			}
		})(id);
	}, [id, visible]);

	return (
		<Modal
			footer={[
				<Button onClick={() => onCancel()} type="default" key="K_0">
					<CloseCircleOutlined />
					<span>取消</span>
				</Button>,
				<Button
					onClick={() => {
						onOk(resourceTree.getCheckedNodes());
					}}
					type="primary"
					key="K_1">
					<CheckCircleOutlined />
					<span>确定</span>
				</Button>
			]}
			onCancel={onCancel}
			visible={visible}
			title="鉴权资源"
			width={600}
			maskClosable={false}
			centered={true}
			destroyOnClose={true}
			bodyStyle={{ padding: 0 }}>
			<ResourceTreeBox>
				<ul id="resourceTree" className="ztree"></ul>
			</ResourceTreeBox>
		</Modal>
	);
};

ResourceModal.defaultProps = {
	visible: false,
	id: '',
	onOk: () => {},
	onCancel: () => {}
};

export default ResourceModal;

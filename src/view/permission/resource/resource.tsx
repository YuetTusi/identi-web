import RootPanel from '@/component/root-panel';
import React, { FC, useEffect } from 'react';
import { connect } from 'dva';
import Table from 'antd/lib/table';
import { getColumns } from './columns';
import { Prop } from './props';

/**
 * 资源查看页
 * @returns
 */
const Resource: FC<Prop> = (props) => {
	const { dispatch, resource } = props;

	useEffect(() => {
		dispatch({
			type: 'resource/queryResource',
			payload: {
				condition: null,
				pageIndex: 1,
				pageSize: 20
			}
		});
	}, []);

	console.log(resource);

	return (
		<RootPanel>
			<div>资源管理</div>
			<Table dataSource={resource.data} columns={getColumns(dispatch)}></Table>
		</RootPanel>
	);
};

export default connect((state: any) => ({ resource: state.resource }))(Resource);

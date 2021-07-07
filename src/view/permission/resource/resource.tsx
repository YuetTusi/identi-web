import RootPanel from '@/component/root-panel';
import React, { FC, useEffect, MouseEvent } from 'react';
import { connect } from 'dva';
import Button from 'antd/lib/button';
import { SearchOutlined } from '@ant-design/icons';
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

	const onSearchClick = (event: MouseEvent<HTMLButtonElement>) => {
		dispatch({
			type: 'resource/queryResource',
			payload: {
				condition: null,
				pageIndex: 1,
				pageSize: 20
			}
		});
	};

	const onPageChange = (pageIndex: number, pageSize?: number) => {
		dispatch({
			type: 'resource/queryResource',
			payload: {
				condition: null,
				pageIndex: pageIndex,
				pageSize: pageSize ?? 20
			}
		});
	};

	return (
		<RootPanel>
			<div>资源查看</div>
			<div>
				<Button onClick={onSearchClick} type="primary">
					<SearchOutlined />
					<span>查询</span>
				</Button>
			</div>
			<Table
				pagination={{
					onChange: onPageChange,
					pageSize: resource.pageSize,
					current: resource.pageIndex,
					total: resource.total
				}}
				columns={getColumns(dispatch)}
				dataSource={resource.data}
				loading={resource.loading}
				bordered={true}></Table>
		</RootPanel>
	);
};

export default connect((state: any) => ({ resource: state.resource }))(Resource);

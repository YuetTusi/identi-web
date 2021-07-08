import RootPanel from '@/component/root-panel';
import React, { FC, useEffect, MouseEvent } from 'react';
import { connect } from 'dva';
import Button from 'antd/lib/button';
import { SearchOutlined } from '@ant-design/icons';

import Table from 'antd/lib/table';
import SearchForm from './search-form';
import { getColumns } from './columns';
import { FormValue, Prop } from './props';

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
				condition: {},
				pageIndex: 1,
				pageSize: 20
			}
		});
	}, []);

	const onSearchFormSubmit = (data: FormValue) => {
		dispatch({
			type: 'resource/queryResource',
			payload: {
				condition: data,
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

	// console.log(resource.total);
	// console.log(resource.pageSize);
	return (
		<>
			<div>资源查看</div>
			<div>
				<SearchForm onSearchFormSubmit={onSearchFormSubmit} />
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
		</>
	);
};

export default connect((state: any) => ({ resource: state.resource }))(Resource);

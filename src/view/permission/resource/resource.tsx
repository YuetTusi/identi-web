import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Table from 'antd/lib/table';
import { StateTree } from '@/schema/model-type';
import { ResourceStoreState } from '@/model/permission/resource';
import { BorderBox, StrongBox, TableBox } from '@/component/styled/container';
import { TablePanel } from '@/component/styled/widget';
import SearchForm from './search-form';
import { getColumns } from './columns';
import { FormValue, Prop } from './props';
/**
 * 资源查看页
 * @returns
 */
const Resource: FC<Prop> = (props) => {
	const dispatch = useDispatch();
	const resource = useSelector<StateTree, ResourceStoreState>((state) => state.resource);

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

	return (
		<>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>资源查看</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>
			<BorderBox marginTop="10px" marginBottom="10px">
				<SearchForm onSearchFormSubmit={onSearchFormSubmit} />
			</BorderBox>
			<TableBox>
				<TablePanel>
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
						bordered={false}
						rowClassName="az-table-row"
					/>
				</TablePanel>
			</TableBox>
		</>
	);
};

export default Resource;

import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Table from 'antd/lib/table';
import { TablePanel } from '@/component/styled/widget';
import { BorderBox, StrongBox, TableBox } from '@/component/styled/container';
import { LawCase } from '@/schema/law-case';
import { StateTree } from '@/schema/model-type';
import { DefaultStoreState } from '@/model/default';
import SearchForm from './search-form';
import { Prop, LawCase4Table } from './props';
import { getColumns } from './columns';

const defaultPageSize = 20;

/**
 * 我的案件
 */
const Default: FC<Prop> = () => {
	const dispatch = useDispatch();
	const defaultState = useSelector<StateTree, DefaultStoreState>((state) => state.default);

	useEffect(() => {
		queryTable(1, defaultPageSize, null);
	}, []);

	/**
	 * 查询
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 * @param condition 条件
	 */
	const queryTable = (pageIndex: number, pageSize: number, condition: any) =>
		dispatch({
			type: 'default/queryMyCase',
			payload: { pageIndex, pageSize, condition }
		});

	/**
	 * 查询submit
	 * @param form 表单
	 */
	const onSearchFormSubmit = async (form: LawCase) => queryTable(1, defaultPageSize, form);

	return (
		<TablePanel>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>我的案件</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>

			<BorderBox marginTop="10px" marginBottom="10px">
				<SearchForm onSearchFormSubmit={onSearchFormSubmit} />
			</BorderBox>
			<TableBox>
				<Table<LawCase4Table>
					columns={getColumns(dispatch)}
					dataSource={defaultState.data}
					loading={defaultState.loading}
					rowClassName="az-table-row"
					rowKey="id"
					bordered={false}
				/>
			</TableBox>
		</TablePanel>
	);
};

export default Default;

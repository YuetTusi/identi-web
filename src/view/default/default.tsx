import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Form from 'antd/lib/form';
import Table from 'antd/lib/table';
import { TablePanel } from '@/component/styled/widget';
import { BorderBox, StrongBox, TableBox } from '@/component/styled/container';
import { LawCase } from '@/schema/law-case';
import { StateTree } from '@/schema/model-type';
import { DefaultStoreState } from '@/model/default';
import SearchForm from './search-form';
import List from './device';
import { Prop, LawCase4Table } from './props';
import { getColumns } from './columns';
import { Suspect } from '@/schema/suspect';

const defaultPageSize = 10;

/**
 * 我的案件
 */
const Default: FC<Prop> = () => {
	const dispatch = useDispatch();
	const [formRef] = Form.useForm<LawCase>();
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
	 * 翻页Change
	 * @param pageIndex 当前页
	 */
	const onPageChange = (pageIndex: number) => {
		const formValue = formRef.getFieldsValue();
		queryTable(pageIndex, defaultPageSize, formValue);
	};

	/**
	 * 查询submit
	 * @param form 表单
	 */
	const onSearchFormSubmit = async (form: LawCase) => queryTable(1, defaultPageSize, form);

	const expandedRowRender = (
		record: LawCase4Table,
		index: number,
		indent: number,
		expanded: boolean
	) => {
		return <List visible={expanded} lawCase={record} />;
	};

	return (
		<TablePanel>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>我的案件</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>

			<BorderBox marginTop="10px" marginBottom="10px">
				<SearchForm formRef={formRef} onSearchFormSubmit={onSearchFormSubmit} />
			</BorderBox>
			<TableBox>
				<Table<LawCase4Table>
					expandable={{ expandedRowRender, expandRowByClick: true }}
					pagination={{
						onChange: onPageChange,
						current: defaultState.pageIndex,
						pageSize: defaultState.pageSize,
						total: defaultState.total
					}}
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

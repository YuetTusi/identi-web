import React, { FC, useEffect } from 'react';
import { connect } from 'dva';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Table from 'antd/lib/table';
import { BorderBox, StrongBox } from '@/component/styled/container';
import SearchForm from './search-form';
import { LawCase } from '@/schema/law-case';
import { Prop, LawCase4Table } from './props';
import { getColumns } from './columns';

const defaultPageSize = 20;

/**
 * 我的案件
 */
const Default: FC<Prop> = (props) => {
	const { dispatch, default: defaultState } = props;

	useEffect(() => {
		queryTable(1, defaultPageSize, null);
	}, []);

	/**
	 * 查询
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 * @param condition 条件
	 */
	const queryTable = (pageIndex: number, pageSize: number, condition: any) => {
		dispatch({
			type: 'default/queryMyCase',
			payload: { pageIndex, pageSize, condition }
		});
	};

	/**
	 * 查询submit
	 * @param form 表单
	 */
	const onSearchFormSubmit = async (form: LawCase) => queryTable(1, defaultPageSize, form);

	return (
		<>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>我的案件</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>

			<BorderBox marginTop="10px" marginBottom="10px">
				<SearchForm onSearchFormSubmit={onSearchFormSubmit} />
			</BorderBox>
			<Table<LawCase4Table>
				columns={getColumns(dispatch)}
				dataSource={defaultState.data}
				loading={defaultState.loading}
				rowKey="id"
				bordered={true}></Table>
		</>
	);
};

export default connect((state: any) => ({ default: state.default }))(Default);

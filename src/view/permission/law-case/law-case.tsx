import React, { FC, useEffect } from 'react';
import { connect, routerRedux } from 'dva';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import Button from 'antd/lib/button';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Table from 'antd/lib/table';
import { BorderBox, StrongBox } from '@/component/styled/container';
import { LawCase as LawCaseEntity } from '@/schema/law-case';
import { SearchBox } from './styled/layout-box';
import IssueModal from './component/issue-modal';
import ReissueModal from './component/reissue-modal';
import SearchForm from './search-form';
import { getColumns } from './columns';
import { LawCase4Table, Prop } from './props';

const defaultPageSize = 20;

const LawCase: FC<Prop> = (props) => {
	const { dispatch, lawCase } = props;

	useEffect(() => {
		queryTable();
	}, []);

	/**
	 * 案件查询
	 */
	const queryTable = (pageIndex = 1, pageSize = defaultPageSize, condition: any = null) =>
		dispatch({
			type: 'lawCase/queryLawCase',
			payload: { pageIndex, pageSize, condition }
		});

	/**
	 * 查询submit
	 * @param form 表单
	 */
	const onSearchFormSubmit = async (form: LawCaseEntity) => queryTable(1, defaultPageSize, form);

	return (
		<>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>案件管理</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>
			<BorderBox marginTop="10px" marginBottom="10px">
				<SearchBox>
					<SearchForm onSearchFormSubmit={onSearchFormSubmit} />
					<Button
						onClick={() => dispatch(routerRedux.push('/permission/law-case/add'))}
						type="primary">
						<PlusCircleOutlined />
						<span>添加</span>
					</Button>
				</SearchBox>
			</BorderBox>
			<Table<LawCase4Table>
				columns={getColumns(dispatch)}
				dataSource={lawCase.data}
				loading={lawCase.loading}
				rowKey="id"
				bordered={true}></Table>
			<IssueModal />
			<ReissueModal />
		</>
	);
};

export default connect((state: any) => ({ lawCase: state.lawCase }))(LawCase);

import React, { FC, useEffect } from 'react';
import { routerRedux, useDispatch, useSelector } from 'dva';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import Button from 'antd/lib/button';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Table from 'antd/lib/table';
import { LawCaseStoreState } from '@/model/permission/law-case';
import { BorderBox, StrongBox, TableBox } from '@/component/styled/container';
import { TablePanel } from '@/component/styled/widget';
import { StateTree } from '@/schema/model-type';
import { LawCase as LawCaseEntity } from '@/schema/law-case';
import { SearchBox } from './styled/layout-box';
import AttachmentModal from '@/component/attachment-modal';
import IssueModal from './component/issue-modal';
import ReissueModal from './component/reissue-modal';
import SearchForm from './search-form';
import { getColumns } from './columns';
import { LawCase4Table, Prop } from './props';

const defaultPageSize = 20;

const LawCase: FC<Prop> = (props) => {
	const dispatch = useDispatch();
	const lawCase = useSelector<StateTree, LawCaseStoreState>((state) => state.lawCase);

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
		<TablePanel>
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
			<TableBox>
				<Table<LawCase4Table>
					columns={getColumns(dispatch)}
					dataSource={lawCase.data}
					loading={lawCase.loading}
					rowKey="id"
					rowClassName="az-table-row"
					bordered={false}
				/>
			</TableBox>
			<IssueModal />
			<ReissueModal />
			<AttachmentModal />
		</TablePanel>
	);
};

export default LawCase;

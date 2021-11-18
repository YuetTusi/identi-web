import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Table from 'antd/lib/table';
import EditModal from './components/edit-modal';
import { TablePanel } from '@/component/styled/widget';
import { BorderBox, StrongBox, TableBox } from '@/component/styled/container';
import { helper } from '@/utility/helper';
import { StateTree } from '@/schema/model-type';
import { Dict as DictEntity } from '@/schema/dict';
import { DictStoreState } from '@/model/permission/dict';
import { SearchBox } from './styled/layout-box';
import { SearchForm } from './search-form';
import { getColumns } from './columns';
import { DictProp } from './props';

const defaultPageSize = 10;
const { useForm } = Form;

/**
 * 字典管理页
 */
const Dict: FC<DictProp> = () => {
	const dispatch = useDispatch();
	const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
	const [editId, setEditId] = useState<string>();
	const [searchFormRef] = useForm<{ category: string }>();
	const [editFormRef] = useForm<DictEntity>();
	const { data, pageIndex, pageSize, total, loading } = useSelector<StateTree, DictStoreState>(
		(state) => state.dict
	);

	useEffect(() => {
		queryDict(1, defaultPageSize, { condition: { category: '' } });
	}, []);

	/**
	 * 表单查询Submit
	 */
	const onSearchFormSubmit = (values: { category: string }) =>
		queryDict(1, defaultPageSize, values);

	/**
	 * 编辑列handle
	 */
	const editHandle = (id: string) => {
		setEditId(id);
		setEditModalVisible(true);
	};

	/**
	 * 添加/编辑保存Click
	 */
	const onEditSave = (values: DictEntity) => {
		if (editId === undefined) {
			values.id = helper.newId();
			dispatch({ type: 'dict/insert', payload: values });
		} else {
			const next: DictEntity = {
				...values,
				id: editId
			};
			dispatch({ type: 'dict/update', payload: next });
		}
		setEditId(undefined);
		setEditModalVisible(false);
	};

	const onEditCancel = () => {
		setEditId(undefined);
		setEditModalVisible(false);
	};

	/**
	 * 查询
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 * @param condition 查询条件
	 */
	const queryDict = (
		pageIndex: number,
		pageSize: number = defaultPageSize,
		condition: Record<string, any> = { category: '' }
	) =>
		dispatch({
			type: 'dict/query',
			payload: { pageIndex, pageSize, condition }
		});

	/**
	 * 翻页Change
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 */
	const onPageChange = (pageIndex: number, pageSize?: number) => {
		const formValue = searchFormRef.getFieldsValue();
		queryDict(pageIndex, pageSize, formValue);
	};

	return (
		<>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>字典管理</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>
			<BorderBox marginTop="10px" marginBottom="10px">
				<SearchBox>
					<SearchForm formRef={searchFormRef} onSearchFormSubmit={onSearchFormSubmit} />
					<Button
						onClick={() => {
							setEditModalVisible(true);
						}}
						type="primary">
						<PlusCircleOutlined />
						<span>添加</span>
					</Button>
				</SearchBox>
			</BorderBox>

			<TableBox>
				<TablePanel>
					<Table<DictEntity>
						pagination={{
							onChange: onPageChange,
							pageSize,
							current: pageIndex,
							total,
							showSizeChanger: false
						}}
						columns={getColumns(dispatch, editHandle)}
						dataSource={data}
						loading={loading}
						bordered={false}
						rowKey="id"
						rowClassName="az-table-row"
					/>
				</TablePanel>
			</TableBox>
			<EditModal
				visible={editModalVisible}
				id={editId}
				formRef={editFormRef}
				onCancel={onEditCancel}
				onOk={onEditSave}
			/>
		</>
	);
};

export default Dict;

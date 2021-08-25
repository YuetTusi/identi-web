import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Form from 'antd/lib/form';
import Table from 'antd/lib/table';
import { StateTree } from '@/schema/model-type';
import { ResourceStoreState } from '@/model/permission/resource';
import { BorderBox, StrongBox, TableBox } from '@/component/styled/container';
import { TablePanel } from '@/component/styled/widget';
import EditSeqModal from './components/edit-seq-modal';
import SearchForm from './search-form';
import { getColumns } from './columns';
import { FormValue as EditSeqFormValue } from './components/edit-seq-modal/props';
import { Prop, FormValue } from './props';
import { Resource as ResourceEntity } from '@/schema/resource';

const defaultPageSize = 10;
const { useForm } = Form;

/**
 * 资源查看页
 * @returns
 */
const Resource: FC<Prop> = (props) => {
	const dispatch = useDispatch();
	const [editData, setEditData] = useState<ResourceEntity>();
	const [editSeqModalVisible, setEditSeqModalVisible] = useState<boolean>(false);
	const [formRef] = useForm<FormValue>();
	const resource = useSelector<StateTree, ResourceStoreState>((state) => state.resource);

	useEffect(() => {
		queryResource(1, defaultPageSize, {});
	}, []);

	const editDataHandle = (data: ResourceEntity) => {
		setEditData(data);
		setEditSeqModalVisible(true);
	};

	/**
	 * 表格查询
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 * @param condition 条件
	 */
	const queryResource = (pageIndex: number, pageSize = defaultPageSize, condition: any) =>
		dispatch({
			type: 'resource/queryResource',
			payload: {
				condition,
				pageIndex: pageIndex,
				pageSize
			}
		});

	/**
	 * 表单submit
	 * @param data 表单数据
	 */
	const onSearchFormSubmit = (data: FormValue) => queryResource(1, defaultPageSize, data);

	/**
	 * 翻页Change
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 */
	const onPageChange = (pageIndex: number, pageSize?: number) => {
		const formValue = formRef.getFieldsValue();
		queryResource(pageIndex, pageSize ?? defaultPageSize, formValue);
	};

	const onSaveClick = (id: string, seq: number) => {
		dispatch({
			type: 'resource/updateSeq',
			payload: {
				id,
				seq
			}
		});
		setEditSeqModalVisible(false);
	};

	const onCancelClick = () => setEditSeqModalVisible(false);

	return (
		<>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>资源查看</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>
			<BorderBox marginTop="10px" marginBottom="10px">
				<SearchForm formRef={formRef} onSearchFormSubmit={onSearchFormSubmit} />
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
						columns={getColumns(dispatch, editDataHandle)}
						dataSource={resource.data}
						loading={resource.loading}
						bordered={false}
						rowClassName="az-table-row"
					/>
				</TablePanel>
			</TableBox>
			<EditSeqModal
				data={editData!}
				onOk={onSaveClick}
				onCancel={onCancelClick}
				visible={editSeqModalVisible}
			/>
		</>
	);
};

export default Resource;

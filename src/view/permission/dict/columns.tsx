import React from 'react';
import { Dispatch } from 'dva';
import Modal from 'antd/lib/modal';
import { ColumnsType } from 'antd/lib/table';
import { Dict } from '@/schema/dict';

const getColumns = (dispatch: Dispatch, ...handles: any[]) => {
	const [setEditId] = handles;

	const columns: ColumnsType<Dict> = [
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '值',
			dataIndex: 'value',
			key: 'value',
			width: 200
		},
		{
			title: '顺序',
			dataIndex: 'seq',
			key: 'seq',
			width: 100
		},
		{
			title: '字典分类',
			dataIndex: 'category',
			key: 'category'
		},
		{
			title: '编辑',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 60,
			render(id: string, record: Dict) {
				return <a onClick={() => setEditId(id)}>编辑</a>;
			}
		},
		{
			title: '删除',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 60,
			render(id: string, { name }: Dict) {
				return (
					<a
						onClick={() => {
							Modal.confirm({
								onOk() {
									dispatch({ type: 'dict/del', payload: id });
								},
								title: '删除',
								content: `确认删除「${name}」字典？`,
								okText: '是',
								cancelText: '否'
							});
						}}>
						删除
					</a>
				);
			}
		}
	];
	return columns;
};

export { getColumns };

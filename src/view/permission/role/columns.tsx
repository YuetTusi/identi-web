import React from 'react';
import { Dispatch } from 'dva';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/lib/table';
import { Role } from '@/schema/role';

const getColumns = (dispatch: Dispatch) => {
	const columns: ColumnsType<Role> = [
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '角色描述',
			dataIndex: 'desc',
			key: 'desc'
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
			key: 'create_time',
			align: 'center',
			width: 160,
			render(value: any) {
				return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
			}
		},
		{
			title: '更新时间',
			dataIndex: 'update_time',
			key: 'update_time',
			align: 'center',
			width: 160,
			render(value: any) {
				return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
			}
		},
		{
			title: '鉴权资源',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 90,
			render(value: string, record: Role) {
				return <a onClick={() => console.log(value)}>鉴权资源</a>;
			}
		}
	];
	return columns;
};

export { getColumns };

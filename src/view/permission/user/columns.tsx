import React from 'react';
import { Dispatch } from 'dva';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/lib/table';
import { User } from '@/schema/user';
import { ActionType } from './props';

const getColumns = (dispatch: Dispatch, onActionClick: (data: User, type: ActionType) => void) => {
	const columns: ColumnsType<User> = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: '用户名',
			dataIndex: 'username',
			key: 'username'
		},
		{
			title: '邮件',
			dataIndex: 'mail',
			key: 'mail'
		},
		{
			title: '手机/电话',
			dataIndex: 'mobile',
			key: 'mobile',
			align: 'center',
			width: 120
		},
		{
			title: '真实姓名',
			dataIndex: 'realname',
			key: 'realname'
		},
		{
			title: '描述',
			dataIndex: 'desc',
			key: 'desc'
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
			key: 'create_time',
			align: 'center',
			width: 150,
			render(value: any) {
				return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
			}
		},
		{
			title: '更新时间',
			dataIndex: 'update_time',
			key: 'update_time',
			align: 'center',
			width: 150,
			render(value: any) {
				return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
			}
		},
		{
			title: '角色',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 60,
			render(value: string, record: User) {
				if (record.username === 'admin') {
					return <span>角色</span>;
				} else {
					return <a onClick={() => onActionClick(record, ActionType.ROLE)}>角色</a>;
				}
			}
		},
		{
			title: '删除',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 60,
			render(value: string, record: User) {
				if (record.username === 'admin') {
					return <span>删除</span>;
				} else {
					return <a onClick={() => onActionClick(record, ActionType.DEL)}>删除</a>;
				}
			}
		}
	];
	return columns;
};

export { getColumns };

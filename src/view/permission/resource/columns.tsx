import React from 'react';
import { Dispatch } from 'dva';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/lib/table';
import { Resource } from '@/schema/resource';

const getColumns = (dispatch: Dispatch, ...args: any[]) => {
	const [handle] = args;

	const columns: ColumnsType<Resource> = [
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '键值（路径）',
			dataIndex: 'key',
			key: 'key'
		},
		{
			title: '类型',
			dataIndex: 'type',
			key: 'type',
			width: 120
		},
		{
			title: '层级',
			dataIndex: 'level',
			key: 'level',
			width: 50
		},
		{
			title: '顺序',
			dataIndex: 'seq',
			key: 'seq',
			width: 60
		},
		{
			title: '上级资源',
			dataIndex: 'pname',
			key: 'pname'
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
			title: '顺序',
			dataIndex: 'seq',
			key: 'seq',
			align: 'center',
			width: 60,
			render(value: number, record) {
				return <a onClick={() => handle(record)}>顺序</a>;
			}
		}
		// {
		// 	title: 'id',
		// 	dataIndex: 'id',
		// 	key: 'id',
		// 	width: 280
		// },
		// {
		// 	title: '父级id',
		// 	dataIndex: 'pid',
		// 	key: 'pid',
		// 	width: 280
		// }
	];
	return columns;
};

export { getColumns };

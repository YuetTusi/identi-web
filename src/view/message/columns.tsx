import React from 'react';
import { Dispatch } from 'dva';
import dayjs from 'dayjs';
import Tag from 'antd/lib/tag';
import { ColumnsType } from 'antd/lib/table';
import { ActionMessage, ActionMessageState } from '@/schema/action-message';

// const defaultPageSize = 10;

const getColumns = (dispatch: Dispatch) => {
	const columns: ColumnsType<ActionMessage> = [
		{
			title: '消息内容',
			dataIndex: 'content',
			key: 'content'
		},
		{
			title: '接收人',
			dataIndex: 'identi_username',
			key: 'identi_username'
		},
		{
			title: '消息状态',
			dataIndex: 'read',
			key: 'read',
			width: 80,
			align: 'center',
			render(value: ActionMessageState) {
				switch (value) {
					case ActionMessageState.Unread:
						return (
							<Tag color="orange" style={{ margin: 0 }}>
								未读
							</Tag>
						);
					case ActionMessageState.Read:
						return (
							<Tag color="green" style={{ margin: 0 }}>
								已读
							</Tag>
						);
					default:
						return <Tag style={{ margin: 0 }}>未知</Tag>;
				}
			}
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
		}
	];
	return columns;
};

export { getColumns };

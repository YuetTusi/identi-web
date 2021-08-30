import dayjs from 'dayjs';
import React from 'react';
import { Dispatch } from 'dva';
import message from 'antd/lib/message';
// import { routerRedux } from 'dva/router';
import { ColumnsType } from 'antd/lib/table';
import Modal from 'antd/lib/modal';
import { Suspect } from '@/schema/suspect';
import { request, RequestResult } from '@/utility/request';

const defaultPageSize = 10;

const getColumns = (...handle: any[]) => {
	const [queryByPage] = handle;
	const columns: ColumnsType<Suspect> = [
		{
			title: '持有人',
			dataIndex: 'owner_name',
			key: 'owner_name'
		},
		{
			title: '手机名称',
			dataIndex: 'phone_name',
			key: 'phone_name'
		},
		{
			title: '备注',
			dataIndex: 'note',
			key: 'note'
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
			key: 'create_time',
			align: 'center',
			width: 150,
			render: (value: Date) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
		},
		{
			title: '更新时间',
			dataIndex: 'update_time',
			key: 'update_time',
			align: 'center',
			width: 150,
			render: (value: Date) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
		},
		{
			title: '编辑',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 60,
			render: (value: string) => {
				return <a>编辑</a>;
			}
		},
		{
			title: '删除',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 60,
			render: (value: string, { phone_name, law_case_id }: Suspect) => {
				return (
					<a
						onClick={() => {
							Modal.confirm({
								async onOk() {
									try {
										const { code, data }: RequestResult<{ success: boolean }> =
											await request({
												url: `device/${value}`,
												method: 'DELETE'
											});
										if (code === 0 && data.success) {
											message.success('设备删除成功');
											queryByPage(1, defaultPageSize, { law_case_id });
										} else {
											message.error('设备删除失败');
										}
									} catch (error) {
										console.log(error);
									}
									
								},
								title: '删除设备',
								content: `确认删除「${phone_name}」？`,
								okText: '是',
								cancelText: '否',
								centered: true
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

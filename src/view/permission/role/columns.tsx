import dayjs from 'dayjs';
import React from 'react';
import { Dispatch } from 'dva';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import { ColumnsType } from 'antd/lib/table';
import { request } from '@/utility/request';
import { Role } from '@/schema/role';

const getRoleColumns = (dispatch: Dispatch, showResourceHandle: (id: string) => void) => {
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
				return (
					<a
						onClick={() => {
							showResourceHandle(value);
						}}>
						鉴权资源
					</a>
				);
			}
		},
		{
			title: '删除',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 60,
			render(value: string, { id, name }: Role) {
				if (name === 'admin') {
					return <span style={{ cursor: 'not-allowed' }}>删除</span>;
				} else {
					return (
						<a
							onClick={() => {
								Modal.confirm({
									async onOk() {
										try {
											const { code, data } = await request<boolean>({
												url: `role/${id}`,
												method: 'DELETE'
											});
											if (code === 0 && data) {
												message.success('角色删除成功');
												dispatch({
													type: 'role/queryRole',
													payload: {
														condition: {},
														pageIndex: 1,
														pageSize: 20
													}
												});
											} else if (code === 2) {
												message.warn(
													'此角色尚有关联用户，请先解除再进行删除'
												);
											} else {
												message.error('角色删除失败');
											}
										} catch (error) {
											message.error('角色删除失败');
										}
									},
									title: `删除角色「${name}」`,
									content: '删除角色，拥有该角色的用户将无法使用，确认删除？',
									okText: '是',
									cancelText: '否'
								});
							}}>
							删除
						</a>
					);
				}
			}
		}
	];
	return columns;
};

export { getRoleColumns };

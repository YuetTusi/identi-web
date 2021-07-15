import React, { FC, useEffect, useState } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { UserAddOutlined } from '@ant-design/icons/lib/icons';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import { request } from '@/utility/request';
import { User as UserEntity } from '@/schema/user';
import { getColumns } from './columns';
import { ActionType, FormValue, Prop } from './props';
import SearchForm from './search-form';
import RoleModal from './role-modal';
import { SearchBox } from './styled/layout-box';

let actionUser: UserEntity | undefined;
const defaultPageSize = 20;

/**
 * 用户管理页
 */
const User: FC<Prop> = (props) => {
	const { dispatch, user } = props;
	const [roleModalVisible, setRoleModalVisible] = useState<boolean>(false);

	useEffect(() => {
		dispatch({
			type: 'user/queryUser',
			payload: {
				condition: {},
				pageIndex: 1,
				pageSize: defaultPageSize
			}
		});
	}, []);

	const onPageChange = (pageIndex: number, pageSize?: number) => {
		dispatch({
			type: 'user/queryUser',
			payload: {
				condition: null,
				pageIndex: pageIndex,
				pageSize: pageSize ?? defaultPageSize
			}
		});
	};

	/**
	 * 查询提交
	 * @param data 表单数据
	 */
	const onSearchFormSubmit = (data: FormValue) => {
		dispatch({
			type: 'user/queryUser',
			payload: {
				condition: data,
				pageIndex: 1,
				pageSize: defaultPageSize
			}
		});
	};

	/**
	 * 删除用户
	 * @param data 用户
	 */
	const delUser = (data: UserEntity) => {
		const { id, username } = data;
		Modal.confirm({
			onOk() {
				request<{ success: boolean }>({
					url: `user/${id}`,
					method: 'DELETE'
				})
					.then(({ code, data }) => {
						message.destroy();
						if (code === 0 && data.success) {
							message.success('删除成功');
							dispatch({
								type: 'user/queryUser',
								payload: {
									condition: data,
									pageIndex: 1,
									pageSize: defaultPageSize
								}
							});
						} else {
							message.success('删除失败');
						}
					})
					.catch((err) => {
						message.success(`删除失败：${err.message}`);
					});
			},
			title: '删除',
			content: `确认删除用户「${username}」？`,
			centered: true,
			okText: '是',
			cancelText: '否'
		});
	};

	/**
	 * 列动作handle
	 * @param data 用户
	 * @param type 类型
	 */
	const onActionClick = (data: UserEntity, type: ActionType) => {
		switch (type) {
			case ActionType.DEL:
				delUser(data);
				break;
			case ActionType.ROLE:
				actionUser = data;
				setRoleModalVisible(true);
				break;
			default:
				break;
		}
	};

	/**
	 * 保存
	 * @param id 用户id
	 * @param roleId 角色id
	 */
	const onSaveRole = async (id: string, roleId: string[]) => {
		const { code, data } = await request<{ success: boolean }>({
			url: `user/role/${id}`,
			method: 'PUT',
			data: { roleId }
		});
		message.destroy();
		if (code === 0 && data.success) {
			setRoleModalVisible(false);
			message.success('更新角色成功');
		} else {
			message.error('更新角色失败');
		}
	};

	return (
		<>
			<Breadcrumb>
				<BreadcrumbItem>用户管理</BreadcrumbItem>
			</Breadcrumb>
			<SearchBox>
				<SearchForm onSearchFormSubmit={onSearchFormSubmit} />
				<Button
					onClick={() => dispatch(routerRedux.push('/permission/user/add'))}
					type="primary">
					<UserAddOutlined />
					<span>添加</span>
				</Button>
			</SearchBox>
			<Table<UserEntity>
				pagination={{
					onChange: onPageChange,
					pageSize: user.pageSize,
					current: user.pageIndex,
					total: user.total
				}}
				columns={getColumns(dispatch, onActionClick)}
				dataSource={user.data}
				loading={user.loading}
				rowKey={(r) => r.id}
				bordered={true}></Table>
			<RoleModal
				data={actionUser}
				visible={roleModalVisible}
				onOk={onSaveRole}
				onCancel={() => {
					actionUser = undefined;
					setRoleModalVisible(false);
				}}
			/>
		</>
	);
};

export default connect((state: any) => ({ user: state.user }))(User);

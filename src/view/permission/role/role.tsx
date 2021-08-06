import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import message from 'antd/lib/message';
import Table from 'antd/lib/table';
import { StrongBox, TableBox } from '@/component/styled/container';
import { TablePanel } from '@/component/styled/widget';
import { Role as RoleEntity } from '@/schema/role';
import { StateTree } from '@/schema/model-type';
import { RoleStoreState } from '@/model/permission/role';
import { request } from '@/utility/request';
import ResourceModal from './component/resource-modal';
import { getRoleColumns } from './columns';
import { Prop } from './props';

const defaultPageSize = 20;
let roleId: string = '';

const Role: FC<Prop> = () => {
	const dispatch = useDispatch();
	const role = useSelector<StateTree, RoleStoreState>((state) => state.role);
	const [resourceModalVisible, setResourceModalVisible] = useState<boolean>(false);

	useEffect(() => {
		dispatch({
			type: 'role/queryRole',
			payload: {
				condition: {},
				pageIndex: 1,
				pageSize: defaultPageSize
			}
		});
	}, []);

	/**
	 * 分页Change
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 */
	const onPageChange = (pageIndex: number, pageSize?: number) => {
		dispatch({
			type: 'role/queryRole',
			payload: {
				condition: {},
				pageIndex: pageIndex,
				pageSize: pageSize ?? defaultPageSize
			}
		});
	};

	/**
	 * 鉴权资源handle
	 * @param id 角色id
	 */
	const showResourceHandle = (id: string) => {
		roleId = id;
		setResourceModalVisible(true);
	};

	/**
	 * 更新角色分配的资源
	 * @param data 用户勾选的资源结点
	 */
	const updateResourceByRoleId = async (data: ITreeNode[]) => {
		const resourceId = data.map((item) => item.id);
		if (resourceId.length === 0) {
			message.destroy();
			message.info('请选择鉴权资源');
		} else {
			const { data } = await request<{ success: boolean }>({
				url: `role/resource/${roleId}`,
				method: 'PUT',
				data: { resourceId }
			});
			message.destroy();
			if (data.success) {
				message.success('鉴权资源更新成功');
				setResourceModalVisible(false);
				dispatch({
					type: 'role/queryRole',
					payload: {
						condition: {},
						pageIndex: 1,
						pageSize: defaultPageSize
					}
				});
			} else {
				message.error('鉴权资源更新失败');
			}
		}
	};

	return (
		<>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>角色管理</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>
			<TableBox marginTop="10px">
				<TablePanel>
					<Table<RoleEntity>
						pagination={{
							onChange: onPageChange,
							pageSize: role.pageSize,
							current: role.pageIndex,
							total: role.total
						}}
						columns={getRoleColumns(dispatch, showResourceHandle)}
						dataSource={role.data}
						loading={role.loading}
						rowKey={(row) => row.id}
						bordered={false}
						rowClassName="az-table-row"
					/>
				</TablePanel>
			</TableBox>

			<ResourceModal
				visible={resourceModalVisible}
				id={roleId}
				onOk={updateResourceByRoleId}
				onCancel={() => setResourceModalVisible(false)}
			/>
		</>
	);
};

export default Role;

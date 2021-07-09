import React, { FC, useEffect, useState } from 'react';
import { connect } from 'dva';
import Button from 'antd/lib/button';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Table from 'antd/lib/table';
import { AntModalOverWrite } from '@/component/styled/overwrite';
import { Role as RoleEntity } from '@/schema/role';
import { getRoleColumns } from './columns';
import ResourceModal from './component/resource-modal';
import { Prop } from './props';

const defaultPageSize = 20;
let roleId: string = '';

const Role: FC<Prop> = (props) => {
	const { dispatch, role } = props;
	let ztree: any = null;
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
				pageSize: pageSize ?? 20
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

	return (
		<>
			<div>角色管理</div>
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
				bordered={true}></Table>
			<ResourceModal
				visible={resourceModalVisible}
				id={roleId}
				onOk={(data: ITreeNode) => {
					console.log(data);
					setResourceModalVisible(false);
				}}
				onCancel={() => setResourceModalVisible(false)}
			/>
		</>
	);
};

export default connect((state: any) => ({ role: state.role }))(Role);
// export default Role;

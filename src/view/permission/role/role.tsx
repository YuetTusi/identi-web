import React, { FC, useEffect } from 'react';
import { connect } from 'dva';
import Table from 'antd/lib/table';
import { Role as RoleEntity } from '@/schema/role';
import { getColumns } from './columns';
import { Prop } from './props';

const defaultPageSize = 20;

const Role: FC<Prop> = (props) => {
	const { dispatch, role } = props;

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

	return (
		<div>
			<div>角色管理</div>
			<Table<RoleEntity>
				pagination={{
					onChange: onPageChange,
					pageSize: role.pageSize,
					current: role.pageIndex,
					total: role.total
				}}
				columns={getColumns(dispatch)}
				dataSource={role.data}
				loading={role.loading}
				rowKey={(row) => row.id}
				bordered={true}></Table>
		</div>
	);
};

export default connect((state: any) => ({ role: state.role }))(Role);

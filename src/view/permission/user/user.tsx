import React, { FC, useEffect } from 'react';
import { connect } from 'dva';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import { User as UserEntity } from '@/schema/user';
import { getColumns } from './columns';
import { Prop } from './props';

const defaultPageSize = 20;

/**
 * 用户管理页
 */
const User: FC<Prop> = (props) => {
	const { dispatch, user } = props;

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

	return (
		<>
			<div>用户管理</div>
			<div>{/* <SearchForm onSearchFormSubmit={onSearchFormSubmit} /> */}</div>
			<Table<UserEntity>
				pagination={{
					onChange: onPageChange,
					pageSize: user.pageSize,
					current: user.pageIndex,
					total: user.total
				}}
				columns={getColumns(dispatch)}
				dataSource={user.data}
				loading={user.loading}
				rowKey={(r) => r.id}
				bordered={true}></Table>
		</>
	);
};

export default connect((state: any) => ({ user: state.user }))(User);

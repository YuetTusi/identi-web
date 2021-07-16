import React, { FC, useEffect } from 'react';
import { connect, routerRedux } from 'dva';
import UserAddOutlined from '@ant-design/icons/UserAddOutlined';
import Button from 'antd/lib/button';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import { SearchBox } from './styled/layout-box';
import { Prop } from './props';

const Case: FC<Prop> = (props) => {
	const { dispatch } = props;

	return (
		<>
			<Breadcrumb>
				<BreadcrumbItem>案件管理</BreadcrumbItem>
			</Breadcrumb>
			<SearchBox>
				<div />
				<Button
					onClick={() => dispatch(routerRedux.push('/permission/case/add'))}
					type="primary">
					<UserAddOutlined />
					<span>添加</span>
				</Button>
			</SearchBox>
		</>
	);
};

export default connect()(Case);

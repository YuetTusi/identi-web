import React from 'react';
import { RouterAPI } from 'dva';
import { Router, Route, Switch } from 'dva/router';
import localeCN from 'antd/es/locale/zh_CN';
import ConfigProvider from 'antd/lib/config-provider';
import Login from '@/view/login';
import Default from '@/view/default';
import User from '@/view/permission/user';
import Role from '@/view/permission/role';
import Resource from '@/view/permission/resource';
import { NotFound } from '@/view/warn';

/**
 * 路由配置
 * @param param0
 * @returns
 */
const createRouter = (api?: RouterAPI) => {
	const { history } = api!;

	return (
		<ConfigProvider locale={localeCN} componentSize="small">
			<Router history={history}>
				<Switch>
					<Route path="/" exact={true} component={Default} />
					<Route path="/login" component={Login} />
					<Route path="/default" component={Default} />
					<Route path="/permission" exact={true} component={User} />
					<Route path="/permission/user" component={User} />
					<Route path="/permission/role" component={Role} />
					<Route path="/permission/resource" component={Resource} />
					<Route component={NotFound} />
				</Switch>
			</Router>
		</ConfigProvider>
	);
};

export { createRouter };

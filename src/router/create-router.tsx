import React from 'react';
import { RouterAPI } from 'dva';
import { Router, Route, Switch } from 'dva/router';
import localeCN from 'antd/es/locale/zh_CN';
import ConfigProvider from 'antd/lib/config-provider';
import Login from '@/view/login';
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
					<Route path="/login" component={Login} />
					<Route component={NotFound} />
				</Switch>
			</Router>
		</ConfigProvider>
	);
};

export { createRouter };

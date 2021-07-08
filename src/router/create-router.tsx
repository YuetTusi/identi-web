import React, { FC, lazy, Suspense } from 'react';
import { RouterAPI } from 'dva';
import { Router, Route, Switch } from 'dva/router';
import localeCN from 'antd/es/locale/zh_CN';
import ConfigProvider from 'antd/lib/config-provider';
import Login from '@/view/login';
import Default from '@/view/default';
import RootPanel from '@/component/root-panel';
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
					<Route
						path="/default"
						render={() => {
							const NextView = lazy<FC<any>>(() => import('@/view/default'));
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel authority={['identifier']}>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/permission"
						exact={true}
						render={() => {
							const NextView = lazy<FC<any>>(() => import('@/view/permission/user'));
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel authority={['admin']}>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/permission/user"
						render={() => {
							const NextView = lazy<FC<any>>(() => import('@/view/permission/user'));
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel authority={['admin']}>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/permission/role"
						render={() => {
							const NextView = lazy<FC<any>>(() => import('@/view/permission/role'));
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel authority={['admin']}>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/permission/resource"
						render={() => {
							const NextView = lazy<FC<any>>(
								() => import('@/view/permission/resource')
							);
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel authority={['admin']}>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route component={NotFound} />
				</Switch>
			</Router>
		</ConfigProvider>
	);
};

export { createRouter };

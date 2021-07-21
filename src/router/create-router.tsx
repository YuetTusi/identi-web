import React, { FC, lazy, Suspense } from 'react';
import { RouterAPI } from 'dva';
import { Router, Route, Switch } from 'dva/router';
import localeCN from 'antd/es/locale/zh_CN';
import ConfigProvider from 'antd/lib/config-provider';
import RootPanel from '@/component/root-panel';
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
					<Route
						path="/"
						exact={true}
						render={() => {
							const NextView = lazy<FC<any>>(() => import('@/view/default'));
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/default"
						exact={true}
						render={() => {
							const NextView = lazy<FC<any>>(() => import('@/view/default'));
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/default/detail/:id"
						render={() => {
							const NextView = lazy<FC<any>>(() => import('@/view/default/detail'));
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/default/begin/:id"
						render={() => {
							const NextView = lazy<FC<any>>(() => import('@/view/default/begin'));
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel>
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
									<RootPanel>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/permission/law-case"
						exact={true}
						render={() => {
							const NextView = lazy<FC<any>>(
								() => import('@/view/permission/law-case')
							);
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/permission/law-case/detail/:id"
						render={() => {
							const NextView = lazy<FC<any>>(
								() => import('@/view/permission/law-case/detail')
							);
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/permission/law-case/add"
						render={() => {
							const NextView = lazy<FC<any>>(
								() => import('@/view/permission/law-case/add')
							);
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/permission/law-case/edit/:id"
						render={() => {
							const NextView = lazy<FC<any>>(
								() => import('@/view/permission/law-case/edit')
							);
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/permission/law-case/approval/:id"
						render={() => {
							const NextView = lazy<FC<any>>(
								() => import('@/view/permission/law-case/approval')
							);
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/permission/user"
						exact={true}
						render={() => {
							const NextView = lazy<FC<any>>(() => import('@/view/permission/user'));
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/permission/user/add"
						render={() => {
							const NextView = lazy<FC<any>>(
								() => import('@/view/permission/user/add')
							);
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					<Route
						path="/permission/user/edit/:id"
						render={() => {
							const NextView = lazy<FC<any>>(
								() => import('@/view/permission/user/edit')
							);
							return (
								<Suspense fallback={<div>加载中...</div>}>
									<RootPanel>
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
									<RootPanel>
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
									<RootPanel>
										<NextView />
									</RootPanel>
								</Suspense>
							);
						}}
					/>
					{/* <Route /> */}
					<Route component={NotFound} />
				</Switch>
			</Router>
		</ConfigProvider>
	);
};

export { createRouter };

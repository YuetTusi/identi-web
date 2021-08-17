import { ThemeProvider } from 'styled-components';
import React, { FC, lazy, Suspense } from 'react';
import { RouterAPI } from 'dva';
import { Router, Route, Switch } from 'dva/router';
import localeCN from 'antd/es/locale/zh_CN';
import ConfigProvider from 'antd/lib/config-provider';
import RootPanel from '@/component/root-panel';
import Loading from '@/component/loading';
import Login from '@/view/login';
import { NotFound } from '@/view/warn';
import { theme } from '@/component/styled/theme';
import { GlobalStyle } from '@/component/styled/global-style';

/**
 * 路由配置
 * @param api 路由参数
 * @returns 路由
 */
const createRouter = (api?: RouterAPI) => {
	const { history } = api!;

	return (
		<ConfigProvider locale={localeCN} componentSize="small">
			<ThemeProvider theme={theme}>
				<Router history={history}>
					<Switch>
						<Route path="/" exact={true} component={Login} />
						<Route path="/login" component={Login} />
						<Route
							path="/default"
							exact={true}
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/default'));
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/default/detail/:id"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/default/detail'));
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/default/begin/:id"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/default/begin'));
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/permission"
							exact={true}
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/permission/user'));
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/permission/law-case"
							exact={true}
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/permission/law-case')
								);
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/permission/law-case/detail/:id"
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/permission/law-case/detail')
								);
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/permission/law-case/add"
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/permission/law-case/add')
								);
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/permission/law-case/edit/:id"
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/permission/law-case/edit')
								);
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/permission/law-case/approval/:id"
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/permission/law-case/approval')
								);
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/permission/user"
							exact={true}
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/permission/user'));
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/permission/user/add"
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/permission/user/add')
								);
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/permission/user/edit/:id"
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/permission/user/edit')
								);
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/permission/role"
							exact={true}
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/permission/role'));
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/permission/role/add"
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/permission/role/add')
								);
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/permission/resource"
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/permission/resource')
								);
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/profile"
							exact={true}
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/profile/setting'));
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/profile/setting"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/profile/setting'));
								return (
									<Suspense fallback={<Loading />}>
										<RootPanel>
											<Next />
										</RootPanel>
									</Suspense>
								);
							}}
						/>
						<Route component={NotFound} />
					</Switch>
				</Router>
			</ThemeProvider>
			<GlobalStyle />
		</ConfigProvider>
	);
};

export { createRouter };

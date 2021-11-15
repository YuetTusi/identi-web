import dayjs from 'dayjs';
import React, { PropsWithChildren } from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { NotAllow, NotLogin } from '@/view/warn';
import AppMenu from '../app-menu';
import {
	ContentBox,
	FooterBox,
	LeftBox,
	MainBox,
	RootContainer,
	TopBox
} from '../styled/container';
import WebHeader from '../web-header';
import { helper } from '@/utility/helper';
import { SessionStorageKeys } from '@/utility/helper';
import { RootPanelProp } from './props';

const thisYear = dayjs().year();

/**
 * 视图根组件
 * 用于验证登录，若用户token不存在则提示
 */
const RootPanel = (props: PropsWithChildren<RootPanelProp>) => {
	const { appMenu } = props;
	const { path } = props.match;
	const notLogin = sessionStorage.getItem(SessionStorageKeys.UserToken) === null;
	let allow = true;

	if (appMenu.data.length !== 0) {
		allow = helper.hasRoute(appMenu.data, path);
	}

	const renderView = () => {
		if (notLogin) {
			return <NotLogin />;
		} else if (!allow) {
			return <NotAllow />;
		} else {
			return (
				<RootContainer>
					<TopBox>
						<WebHeader />
					</TopBox>
					<MainBox>
						<LeftBox>
							<AppMenu />
						</LeftBox>
						<ContentBox>{props.children}</ContentBox>
					</MainBox>
					<FooterBox>
						<div>&copy;{thisYear} 安证网信（北京）信息科技有限公司</div>
					</FooterBox>
				</RootContainer>
			);
		}
	};

	return renderView();
};

export default withRouter(connect((state: any) => ({ appMenu: state.appMenu }))(RootPanel));

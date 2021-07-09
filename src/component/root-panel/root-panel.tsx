import { NotLogin } from '@/view/warn';
import React, { FC } from 'react';
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
import { RootPanelProp } from './props';

/**
 * 当前登录用户是否允许访问
 * @param authority 当前页角色
 */
const allow = (authority: string[]) => {
	const val = sessionStorage.getItem('role');
	// debugger;
	if (val === null) {
		return false;
	} else {
		let has = false;
		try {
			const auth: string[] = JSON.parse(val);
			for (let i = 0, l = auth.length; i < l; i++) {
				if (authority.includes(auth[i])) {
					has = true;
					break;
				}
			}
			return has;
		} catch (error) {
			return false;
		}
	}
};

/**
 * 视图根组件
 * 用于验证登录，若用户token不存在则提示
 * @returns
 */
const RootPanel: FC<RootPanelProp> = (props) => {
	const { authority } = props;
	const notLogin = sessionStorage.getItem('user_token') === null;

	const renderView = () => {
		if (notLogin) {
			return <NotLogin />;
		} else if (allow(authority)) {
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
					<FooterBox>脚</FooterBox>
				</RootContainer>
			);
		} else {
			return <div>无权限访问</div>;
		}
	};

	return renderView();
};

export default RootPanel;

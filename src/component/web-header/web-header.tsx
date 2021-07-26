import React, { FC, MouseEvent } from 'react';
import { useDispatch } from 'dva';
import { routerRedux } from 'dva/router';
import { WebHeaderRoot } from './styled/layout-box';
import Button from 'antd/lib/button';
import UserOutlined from '@ant-design/icons/UserOutlined';
import MailOutlined from '@ant-design/icons/lib/icons/MailOutlined';

const WebHeader: FC<{}> = () => {
	const dispatch = useDispatch();

	/**
	 * 登出Click
	 */
	const onLogoutClick = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		sessionStorage.clear();
		window.location.href = '/#/login';
	};

	return (
		<WebHeaderRoot>
			<div className="first-row">
				<div className="caption">案件鉴定管理</div>
				<div className="fn">
					<a onClick={onLogoutClick}>退出系统</a>
				</div>
			</div>
			<div className="second-row">
				<div className="left"></div>
				<div className="right">
					<div className="btn">
						<Button type="default" shape="circle" icon={<MailOutlined />}></Button>
					</div>
					<div
						className="user"
						onClick={() => dispatch(routerRedux.push('/profile/setting'))}>
						<i>
							<UserOutlined />
						</i>
						<div>
							<span>{sessionStorage.getItem('username') ?? ''}</span>
						</div>
					</div>
				</div>
			</div>
		</WebHeaderRoot>
	);
};

export default WebHeader;

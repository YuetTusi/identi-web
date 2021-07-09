import React, { FC, MouseEvent } from 'react';
// import { routerRedux } from 'dva/router';

const WebHeader: FC<{}> = () => {
	/**
	 * 登出Click
	 */
	const onLogoutClick = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		sessionStorage.clear();
		window.location.href = '/#/login';
	};

	return (
		<div>
			<label>当前用户：</label>
			<span>{sessionStorage.getItem('username') ?? ''}</span>
			<a onClick={onLogoutClick}>安全退出</a>
		</div>
	);
};

export default WebHeader;

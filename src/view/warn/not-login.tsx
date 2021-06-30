import React from 'react';
import { Link } from 'dva/router';

const NotLogin = () => (
	<div>
		<h2>用户未登录</h2>
		<hr />
		<Link to="/login">去登录页</Link>
	</div>
);

export default NotLogin;

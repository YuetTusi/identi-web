import React from 'react';
import { Link } from 'dva/router';

const NotAllow = () => (
	<div>
		<h2>您无权访问此页面</h2>
		<hr />
		<Link to="/login">去登录页</Link>
	</div>
);

export default NotAllow;

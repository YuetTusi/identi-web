import React from 'react';
import { routerRedux } from 'dva/router';
import Button from 'antd/lib/button';
import WarningOutlined from '@ant-design/icons/WarningOutlined';
import KeyOutlined from '@ant-design/icons/KeyOutlined';
import { WarnBox } from './styled/WarnBox';
import { useDispatch } from 'dva';

const { Group } = Button;

const NotLogin = () => {
	const dispatch = useDispatch();

	return (
		<WarnBox>
			<div>
				<h1>
					<WarningOutlined />
					<span>HTTP 401</span>
				</h1>
			</div>
			<div>
				<h4>抱歉，您尚未登录系统</h4>
			</div>
			<hr />
			<div className="button-box">
				<Group size="large">
					<Button onClick={() => dispatch(routerRedux.push('/login'))} type="primary">
						<KeyOutlined />
						<span>重新登录</span>
					</Button>
				</Group>
			</div>
		</WarnBox>
	);
};

export default NotLogin;

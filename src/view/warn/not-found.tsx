import React from 'react';
import { routerRedux, useDispatch } from 'dva';
import Button from 'antd/lib/button';
import WarningOutlined from '@ant-design/icons/WarningOutlined';
import KeyOutlined from '@ant-design/icons/KeyOutlined';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import { WarnBox } from './styled/WarnBox';

const { Group } = Button;

/**
 * 404 无页面
 */
const NotFound = () => {
	const dispatch = useDispatch();
	return <WarnBox>
		<div>
			<h1>
				<WarningOutlined />
				<span>HTTP 404</span>
			</h1>
		</div>
		<div>
			<h4>抱歉，您访问了不存在的页面</h4>
		</div>
		<hr />
		<div className="button-box">
			<Group size="large">
				<Button onClick={() => dispatch(routerRedux.goBack())} type="primary">
					<ArrowLeftOutlined />
					<span>返回前页</span>
				</Button>
				<Button
					onClick={() => {
						sessionStorage.clear();
						dispatch(routerRedux.push('/login'));
					}}
					type="primary">
					<KeyOutlined />
					<span>重新登录</span>
				</Button>
			</Group>
		</div>
	</WarnBox>;
};

export default NotFound;

import React, { FC } from 'react';
import { connect } from 'dva';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import { KeyOutlined } from '@ant-design/icons';
import { LoginBox } from './styled/login-box';
import { request } from '@/utility/request';
import { LoginProp } from './props';
import { useEffect } from 'react';

const { Item } = Form;
const { Password } = Input;

const Login: FC<LoginProp> = (props) => {
	useEffect(() => {
		console.log(props.auth);
	}, []);

	const onLoginFormFinish = (values: any) => {
		request({
			url: '/login',
			method: 'post',
			data: { username: values.username, password: values.password }
		}).then((res: any) => {
			if (res.success) {
				const { uid, role, token } = res.data;
				//todo:可将角色、用户等数据存入model
				sessionStorage.setItem('user_token', token);
				sessionStorage.setItem('uid', uid);
				sessionStorage.setItem('role', role);
				sessionStorage.setItem('username', values.username);

				(props as any).dispatch({
					type: 'auth/setAuth',
					payload: { uid, role, username: values.username }
				});
			}
		});
	};

	return (
		<LoginBox>
			<button
				type="button"
				onClick={() => {
					request({
						url: '/',
						method: 'get'
					}).then((res: any) => {
						console.log(res);
					});
				}}>
				test
			</button>
			<Form onFinish={onLoginFormFinish}>
				<Item
					label="用户"
					name="username"
					rules={[{ required: true, message: '请输入用户' }]}>
					<Input />
				</Item>
				<Item
					label="密码"
					name="password"
					rules={[{ required: true, message: '请输入密码' }]}>
					<Password />
				</Item>
				<Item wrapperCol={{ offset: 21 }}>
					<Button type="primary" htmlType="submit">
						<KeyOutlined />
						<span>登录</span>
					</Button>
				</Item>
			</Form>
		</LoginBox>
	);
};

export default connect((state: any) => ({ auth: state.auth }))(Login);

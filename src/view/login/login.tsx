import React, { FC } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import debounce from 'lodash/debounce';
import { Base64 } from 'js-base64';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import { KeyOutlined } from '@ant-design/icons';
import { LoginBox } from './styled/login-box';
import { request } from '@/utility/request';
import { LoginProp } from './props';

const { Item } = Form;
const { Password } = Input;

const Login: FC<LoginProp> = (props) => {
	const { dispatch } = props;

	const onLoginFormFinish = debounce(
		(values: any) => {
			request({
				url: '/login',
				method: 'post',
				data: { username: values.username, password: values.password }
			}).then((res: any) => {
				message.destroy();
				if (res.success) {
					const { uid, role, token } = res.data;

					if (role.length === 0) {
						message.warn('此用户无权限访问');
					} else {
						message.success('登录成功');
						//todo:可将角色、用户等数据存入model
						sessionStorage.setItem('user_token', token);
						sessionStorage.setItem('uid', uid);
						sessionStorage.setItem('role', Base64.encode(JSON.stringify(role)));
						sessionStorage.setItem('username', values.username);

						dispatch({
							type: 'auth/setAuth',
							payload: { uid, role, username: values.username }
						});
						dispatch({
							type: 'appMenu/queryMenuByUserId',
							payload: { id: uid }
						});
						dispatch(routerRedux.push('/default'));
					}
				} else {
					message.destroy();
					message.warn('登录失败，用户或密码不正确');
				}
			});
		},
		500,
		{ leading: true, trailing: false }
	);

	return (
		<LoginBox>
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

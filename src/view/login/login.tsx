import React, { FC } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import debounce from 'lodash/debounce';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import { KeyOutlined } from '@ant-design/icons';
import { request } from '@/utility/request';
import { helper } from '@/utility/helper';
import { LoginRoot } from './styled/login-box';
import { LoginProp } from './props';

const { Item } = Form;
const { Password } = Input;

const Login: FC<LoginProp> = ({ dispatch }) => {
	const onLoginFormFinish = debounce(
		({ username, password }: any) => {
			request({
				url: '/login',
				method: 'post',
				data: { username, password }
			})
				.then((res: any) => {
					message.destroy();
					if (res.success) {
						const { uid, role, token } = res.data;

						if (role.length === 0) {
							message.warn('此用户无权限访问');
						} else {
							message.success('登录成功');
							//TODO:可将角色、用户等数据存入model
							sessionStorage.setItem('username', username);
							sessionStorage.setItem('user_token', token);
							sessionStorage.setItem('role', btoa(JSON.stringify(role)));
							helper.setUId(uid);

							dispatch({
								type: 'auth/setAuth',
								payload: { uid, role, username: username }
							});
							dispatch({
								type: 'appMenu/queryMenuByUserId',
								payload: { id: uid }
							});
							dispatch(routerRedux.push('/default'));
						}
					} else {
						message.destroy();
						message.warn('用户或密码不正确');
					}
				})
				.catch((err) => console.log(err));
		},
		500,
		{ leading: true, trailing: false }
	);

	return (
		<LoginRoot>
			<div className="login-box">
				<h1>登录</h1>
				<Form onFinish={onLoginFormFinish} size="middle" layout="vertical">
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
					<Item style={{ textAlign: 'right', paddingTop: '10px' }}>
						<Button type="primary" htmlType="submit">
							<KeyOutlined />
							<span>登录</span>
						</Button>
					</Item>
				</Form>
			</div>
		</LoginRoot>
	);
};

export default connect((state: any) => ({ auth: state.auth }))(Login);

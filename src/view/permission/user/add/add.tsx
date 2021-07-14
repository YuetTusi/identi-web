import React, { FC, MouseEvent } from 'react';
import { v4 as newId } from 'uuid';
import dayjs from 'dayjs';
import throttle from 'lodash/throttle';
import Button from 'antd/lib/button';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import { request } from '@/utility/request';
import { User } from '@/schema/user';
import { Mail, OnlyNumber } from '@/utility/regex';
import { SearchBox } from '../styled/layout-box';
import { AddFormValue, AddProp } from './props';
const { Item, useForm } = Form;
const { Password } = Input;

/**
 * 验证用户名存在
 * @param username 用户名
 */
const validUserNameExist = throttle((username: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		request<{ count: number }>({ url: `user/count/${username}`, method: 'GET' }).then(
			({ data }) => {
				if (data.count === 0) {
					resolve();
				} else {
					reject(new Error(`用户名${username}已存在`));
				}
			}
		);
	});
}, 400);

const Add: FC<AddProp> = (props) => {
	const [form] = useForm<AddFormValue>();

	/**
	 * 表单提交
	 * @param event
	 */
	const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const values = await form.validateFields();
		let entity = new User();
		entity.id = newId();
		entity.username = values.username;
		entity.password = values.password;
		entity.realname = values.realname;
		entity.mail = values.mail;
		entity.mobile = values.mobile;
		entity.desc = values.desc;
		entity.create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
		entity.update_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
		message.destroy();
		try {
			const { code, data } = await request<number>({
				url: 'user',
				method: 'POST',
				data: { form: entity }
			});
			if (code === 0 && data > 0) {
				message.success('添加成功');
				form.resetFields();
				window.location.hash = '/permission/user';
			} else {
				message.error('添加失败');
			}
		} catch (error) {
			message.error(`添加失败：${error.message}`);
		}
	};

	return (
		<>
			<div>添加用户</div>
			<hr />
			<SearchBox>
				<div></div>
				<div>
					<Button onClick={onSubmit} type="primary">
						<SaveOutlined />
						<span>保存</span>
					</Button>
				</div>
			</SearchBox>
			<Form form={form} layout="vertical">
				<Item
					name="username"
					label="用户名"
					rules={[
						{ required: true, message: '请填写用户名' },
						() => ({
							validator(_, value) {
								return validUserNameExist(value);
							},
							message: '用户名已存在'
						})
					]}>
					<Input maxLength={50} />
				</Item>
				<Item
					name="password"
					label="密码"
					rules={[{ required: true, message: '请填写密码' }]}>
					<Password maxLength={50} />
				</Item>
				<Item
					dependencies={['password']}
					rules={[
						{ required: true, message: '请重复输入密码' },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('请确认与密码输入一致'));
							}
						})
					]}
					name="repassword"
					label="重复密码">
					<Password />
				</Item>
				<Item
					name="mail"
					label="邮件"
					rules={[{ pattern: Mail, message: '请输入正确的邮件格式' }]}>
					<Input maxLength={200} />
				</Item>
				<Item name="mobile" label="手机/电话" rules={[{ pattern: OnlyNumber, message: '请输入数字' }]}>
					<Input maxLength={50} />
				</Item>
				<Item name="realname" label="真实姓名">
					<Input maxLength={50} />
				</Item>
				<Item name="desc" label="描述">
					<Input maxLength={200} />
				</Item>
			</Form>
		</>
	);
};

export default Add;

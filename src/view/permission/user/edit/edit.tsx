import React, { FC, useEffect, useRef, MouseEvent } from 'react';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import { useParams, Link } from 'dva/router';
import { Breadcrumb } from 'antd';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import { SaveOutlined } from '@ant-design/icons/lib/icons';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import { BorderBox, StrongBox } from '@/component/styled/container';
import { request } from '@/utility/request';
import { User } from '@/schema/user';
import { Mail, OnlyNumber } from '@/utility/regex';
import { SearchBox } from '../styled/layout-box';
import { EditFormValue, EditProp } from './props';

const { Item, useForm } = Form;

/**
 * 用户编辑
 */
const Edit: FC<EditProp> = (props) => {
	const { id } = useParams<{ id: string }>();
	const [editFormRef] = useForm<EditFormValue>();
	const nextUserRef = useRef<User | null>(null);

	useEffect(() => {
		(async () => {
			message.destroy();
			try {
				const { setFieldsValue } = editFormRef;
				const { code, data } = await request<User[]>({ url: `user/${id}`, method: 'GET' });
				if (code === 0 && data.length > 0) {
					nextUserRef.current = data[0];
					setFieldsValue({
						username: data[0].username,
						mail: data[0].mail,
						mobile: data[0].mobile,
						realname: data[0].realname,
						desc: data[0].desc
					});
				} else {
					message.error('查询用户数据失败');
				}
			} catch (error) {
				message.error('查询用户数据失败');
			}
		})();
	}, []);

	const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const values = await editFormRef.validateFields();
		let entity = new User();
		if (nextUserRef.current) {
			entity.username = nextUserRef.current.username;
			entity.password = nextUserRef.current.password;
			entity.realname = nextUserRef.current.realname;
			entity.mail = nextUserRef.current.mail;
			entity.mobile = nextUserRef.current.mobile;
			entity.desc = nextUserRef.current.desc;
			entity.create_time = nextUserRef.current.create_time;
		}
		entity.id = id;
		entity.username = values.username;
		entity.realname = values.realname;
		entity.mail = values.mail;
		entity.mobile = values.mobile;
		entity.desc = values.desc;
		entity.update_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
		message.destroy();
		try {
			const { code, data } = await request<number>({
				url: `user/${id}`,
				method: 'PUT',
				data: { form: entity }
			});
			if (code === 0 && data > 0) {
				message.success('编辑成功');
				editFormRef.resetFields();
				location.hash = '/permission/user';
			} else {
				message.error('编辑失败');
			}
		} catch (error) {
			message.error(`编辑失败：${error.message}`);
		}
	};

	return (
		<>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/permission/user">用户管理</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>编辑用户</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>
			<BorderBox marginTop="10px" marginBottom="10px">
				<SearchBox>
					<div />
					<div>
						<Button onClick={onSubmit} type="primary">
							<SaveOutlined />
							<span>保存</span>
						</Button>
					</div>
				</SearchBox>
			</BorderBox>
			<BorderBox>
				<Form form={editFormRef} layout="vertical">
					<Item name="username" label="用户名">
						<Input maxLength={50} disabled={true} />
					</Item>
					<Item
						name="mail"
						label="邮件"
						rules={[{ pattern: Mail, message: '请输入正确的邮件格式' }]}>
						<Input maxLength={200} />
					</Item>
					<Item
						name="mobile"
						label="手机/电话"
						rules={[{ pattern: OnlyNumber, message: '请输入数字' }]}>
						<Input maxLength={50} />
					</Item>
					<Item name="realname" label="真实姓名">
						<Input maxLength={50} />
					</Item>
					<Item name="desc" label="描述">
						<Input maxLength={200} />
					</Item>
				</Form>
			</BorderBox>
		</>
	);
};

export default Edit;

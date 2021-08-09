import dayjs from 'dayjs';
import React, { FC } from 'react';
import { routerRedux, useDispatch } from 'dva';
import { Link } from 'dva/router';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import Button from 'antd/lib/button';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import { BorderBox, StrongBox } from '@/component/styled/container';
import { Role } from '@/schema/role';
import { helper } from '@/utility/helper';
import { request } from '@/utility/request';
import { SearchBox } from '../styled/layout';

const { Item, useForm } = Form;

const Add: FC<{}> = () => {
	const dispatch = useDispatch();
	const [addFormRef] = useForm();

	const onFormSubmit = async () => {
		try {
			const values = await addFormRef.validateFields();

			const { code, data, error } = await request<boolean>({
				url: 'role',
				method: 'POST',
				data: {
					...values,
					id: helper.newId(),
					create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
				}
			});
			message.destroy();
			if (code === 0 && data) {
				message.success('角色添加成功');
				dispatch(routerRedux.push('/permission/role'));
			} else {
				console.log(error);
				message.error('角色添加失败');
			}
		} catch (error) {
			console.log(error.stack);
			message.error('角色添加失败');
		}
	};

	return (
		<>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/permission/role">角色管理</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>添加角色</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>
			<BorderBox marginTop="10px" marginBottom="10px">
				<SearchBox>
					<div />
					<div>
						<Button onClick={onFormSubmit} type="primary">
							<SaveOutlined />
							<span>保存</span>
						</Button>
					</div>
				</SearchBox>
			</BorderBox>
			<BorderBox>
				<Form<Role> form={addFormRef} layout="horizontal">
					<Item
						name="name"
						label="角色名称"
						rules={[{ required: true, message: '请填写角色名称' }]}>
						<Input />
					</Item>
					<Item name="desc" label="角色描述">
						<Input />
					</Item>
				</Form>
			</BorderBox>
		</>
	);
};

export default Add;

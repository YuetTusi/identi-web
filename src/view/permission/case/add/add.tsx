import React, { FC, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as newId } from 'uuid';
import dayjs from 'dayjs';
import { Link, routerRedux } from 'dva/router';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Button from 'antd/lib/button';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
import { useDict, useUserList } from '@/hook';
import { User } from '@/schema/user';
import { CaseState, LawCase } from '@/schema/law-case';
import { DictCategory } from '@/schema/dict';
import { helper } from '@/utility/helper';
import { request } from '@/utility/request';
import { SearchBox } from '../styled/layout-box';
import { AddProp } from './props';

const { Item, useForm } = Form;
const { Option } = Select;

const bindUserList = (data: User[]) => {
	if (data && data.length > 0) {
		return data.map((item) => (
			<Option value={item.id} key={item.username}>
				{item.realname ? `${item.username}（${item.realname}）` : item.username}
			</Option>
		));
	} else {
		return null;
	}
};

const Add: FC<AddProp> = (props) => {
	const dispatch = useDispatch();
	const [addFormRef] = useForm<LawCase>();
	const userList = useUserList();
	const dict = useDict(DictCategory.CaseType);

	/**
	 * 表单提交
	 */
	const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		const { validateFields } = addFormRef;
		event.preventDefault();
		message.destroy();
		try {
			const values = await validateFields();
			values.id = newId();
			values.state = CaseState.NotIdenti;
			values.create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
			values.update_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
			const { data, code } = await request<number>({
				url: 'law-case',
				method: 'POST',
				data: { form: values }
			});
			if (code === 0 && data > 0) {
				message.success('案件添加成功');
				dispatch(routerRedux.push('/permission/case'));
			} else {
				message.error('案件添加失败');
			}
		} catch (error) {
			console.warn(error);
		}
	};

	return (
		<>
			<Breadcrumb>
				<BreadcrumbItem>
					<Link to="/permission/case">案件管理</Link>
				</BreadcrumbItem>
				<BreadcrumbItem>添加案件</BreadcrumbItem>
			</Breadcrumb>
			<SearchBox>
				<div></div>
				<div>
					<Button onClick={onSubmit} type="primary">
						<SaveOutlined />
						<span>保存</span>
					</Button>
				</div>
			</SearchBox>
			<Form form={addFormRef} layout="horizontal">
				<Item
					label="鉴定人"
					name="identi_id"
					rules={[{ required: true, message: '请选择鉴定人' }]}>
					<Select>{bindUserList(userList)}</Select>
				</Item>
				<Item
					label="审核人"
					name="check_id"
					rules={[{ required: true, message: '请选择审核人' }]}>
					<Select>{bindUserList(userList)}</Select>
				</Item>
				<Item
					label="案件名称"
					name="case_name"
					rules={[{ required: true, message: '请填写案件名称' }]}>
					<Input />
				</Item>
				<Item label="检验单位" name="check_unit_name">
					<Input />
				</Item>
				<Item label="采集人员编号" name="officer_no">
					<Input />
				</Item>
				<Item label="采集人员" name="officer_name">
					<Input />
				</Item>
				<Item label="网安部门案件编号" name="security_case_no">
					<Input />
				</Item>
				<Item label="网安部门案件名称" name="security_case_name">
					<Input />
				</Item>
				<Item label="网安部门案件类别" name="security_case_type" initialValue="">
					<Select>{helper.bindOptions(dict, true)}</Select>
				</Item>
				<Item label="执法办案系统案件编号" name="handle_case_no">
					<Input />
				</Item>
				<Item label="执法办案系统案件类别" name="handle_case_type">
					<Input />
				</Item>
				<Item label="执法办案系统案件名称" name="handle_case_name">
					<Input />
				</Item>
			</Form>
		</>
	);
};

export default Add;

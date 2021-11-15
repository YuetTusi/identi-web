import React, { FC, MouseEvent, useEffect, useRef } from 'react';
import { useDispatch } from 'dva';
import dayjs from 'dayjs';
import { Link, routerRedux, useParams } from 'dva/router';
import { useDict, useUserList } from '@/hook';
import { helper } from '@/utility/helper';
import { request } from '@/utility/request';
import { OfficerNumber } from '@/utility/regex';
import { DictCategory } from '@/schema/dict';
import { LawCase } from '@/schema/law-case';
import { User } from '@/schema/user';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
import { BorderBox, StrongBox } from '@/component/styled/container';
import { SearchBox } from '../styled/layout-box';
import { EditProp } from './props';

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

/**
 * 案件编辑页
 * 路由参数id传案件PrimaryKey
 */
const Edit: FC<EditProp> = () => {
	const dispatch = useDispatch();
	const { id } = useParams<{ id: string }>();
	const editCaseRef = useRef<LawCase>();
	const [editFormRef] = useForm<LawCase>();
	const userList = useUserList();
	const dict = useDict(DictCategory.CaseType);

	useEffect(() => {
		message.destroy();
		(async () => {
			try {
				const { code, data } = await request<LawCase>({
					url: `law-case/${id}`,
					method: 'GET'
				});
				if (code === 0 && data !== null) {
					editCaseRef.current = data;
					editFormRef.setFieldsValue(data);
				} else {
					message.error('读取案件数据失败');
				}
			} catch (error) {
				message.error('读取案件数据失败');
			}
		})();
	}, [id]);

	/**
	 * 表单提交
	 */
	const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		const { validateFields } = editFormRef;
		event.preventDefault();
		message.destroy();
		try {
			const values = await validateFields();

			let next: LawCase = {
				state: editCaseRef.current!.state,
				create_time: dayjs(editCaseRef.current!.create_time).format('YYYY-MM-DD HH:mm:ss'),
				id,
				check_id: values.check_id,
				identi_id: values.identi_id,
				case_name: values.case_name,
				check_unit_name: values.check_unit_name,
				officer_no: values.officer_no,
				officer_name: values.officer_name,
				security_case_no: values.security_case_no,
				security_case_type: values.security_case_type,
				security_case_name: values.security_case_name,
				handle_case_no: values.handle_case_no,
				handle_case_type: values.handle_case_type,
				handle_case_name: values.handle_case_name,
				update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
			};

			const { data, code } = await request<number>({
				url: `law-case/${id}`,
				method: 'PUT',
				data: { form: next }
			});
			if (code === 0 && data > 0) {
				message.success('案件编辑成功');
				dispatch(routerRedux.push('/permission/law-case'));
			} else {
				message.error('案件编辑失败');
			}
		} catch (error) {
			console.warn(error);
		}
	};

	return (
		<>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/permission/law-case">案件管理</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>编辑案件</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>
			<BorderBox marginTop="10px" marginBottom="10px">
				<SearchBox>
					<div></div>
					<div>
						<Button onClick={onSubmit} type="primary">
							<SaveOutlined />
							<span>保存</span>
						</Button>
					</div>
				</SearchBox>
			</BorderBox>
			<BorderBox>
				<Form form={editFormRef} layout="horizontal">
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
					<Item label="案件名称" name="case_name">
						<Input disabled={true} />
					</Item>
					<Item label="检验单位" name="check_unit_name">
						<Input />
					</Item>
					<Item
						label="采集人员编号"
						name="officer_no"
						rules={[{ pattern: OfficerNumber, message: '请输入6位数字' }]}>
						<Input maxLength={6} placeholder="6位数字" />
					</Item>
					<Item label="采集人员" name="officer_name">
						<Input maxLength={50} />
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
					<Item label="执法办案系统案件名称" name="handle_case_name">
						<Input />
					</Item>
					<Item label="执法办案系统案件类别" name="handle_case_type">
						<Input />
					</Item>
				</Form>
			</BorderBox>
		</>
	);
};

export default Edit;

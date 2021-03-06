import React, { FC } from 'react';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import { SearchOutlined } from '@ant-design/icons/lib/icons';
import { CaseState } from '@/schema/law-case';
import { useUserList } from '@/hook';
import { SearchFormProp } from './props';
import { User } from '@/schema/user';

const { Item } = Form;
const { Option } = Select;

/**
 * 查询表单
 */
const SearchForm: FC<SearchFormProp> = (props) => {
	const { formRef, onSearchFormSubmit } = props;

	const userList = useUserList();

	const onSubmit = () => {
		const formData = formRef.getFieldsValue();
		onSearchFormSubmit(formData);
	};

	/**
	 * 绑定用户select
	 * @param data 用户数据
	 * @returns
	 */
	const bindUserList = (data: User[]) => {
		if (data && data.length > 0) {
			return [
				<Option value="" key="K_0">
					---
				</Option>
			].concat(
				data.map((item) => (
					<Option value={item.id} key={item.id}>
						{item.realname ? `${item.username}(${item.realname})` : item.username}
					</Option>
				))
			);
		} else {
			return <Option value="">---</Option>;
		}
	};

	return (
		<Form form={formRef} layout="inline">
			<Item name="case_name" label="案件名称">
				<Input maxLength={100} />
			</Item>
			<Item name="check_id" label="审核人" initialValue={''}>
				<Select style={{ width: '180px' }}>{bindUserList(userList)}</Select>
			</Item>
			<Item name="state" label="状态" initialValue={''}>
				<Select style={{ width: '80px' }}>
					<Option value={''}>全部</Option>
					<Option value={CaseState.NotIdenti}>
						<span>未鉴定</span>
					</Option>
					<Option value={CaseState.ToBeIdenti}>
						<span style={{ color: '#096dd9' }}>待鉴定</span>
					</Option>
					<Option value={CaseState.Reject}>
						<span style={{ color: '#d46b08' }}>驳回</span>
					</Option>
					<Option value={CaseState.Approval}>
						<span style={{ color: '#08979c' }}>审核</span>
					</Option>
					<Option value={CaseState.Finish}>
						<span style={{ color: '#389e0d' }}>完成</span>
					</Option>
				</Select>
			</Item>
			<Item>
				<Button onClick={onSubmit} type="primary">
					<SearchOutlined />
					<span>查询</span>
				</Button>
			</Item>
		</Form>
	);
};

export default SearchForm;

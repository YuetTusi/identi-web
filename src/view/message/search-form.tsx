import React, { FC } from 'react';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import { SearchOutlined } from '@ant-design/icons/lib/icons';
import { ActionMessageState } from '@/schema/action-message';
import { SearchFormProp } from './props';

const { Item } = Form;
const { Option } = Select;

/**
 * 查询表单
 */
const SearchForm: FC<SearchFormProp> = ({ formRef, onSearchFormSubmit }) => {
	const onSubmit = () => {
		const formData = formRef.getFieldsValue();
		onSearchFormSubmit(formData);
	};

	return (
		<Form form={formRef} layout="inline">
			<Item name="read" label="消息状态" initialValue={''}>
				<Select style={{ width: '70px' }}>
					<Option value={''}>全部</Option>
					<Option value={ActionMessageState.Unread}>
						<span style={{ color: '#d46b08' }}>未读</span>
					</Option>
					<Option value={ActionMessageState.Read}>
						<span style={{ color: '#389e0d' }}>已读</span>
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

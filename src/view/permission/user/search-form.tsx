import React, { FC } from 'react';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import { SearchFormProp } from './props';
import { SearchOutlined } from '@ant-design/icons/lib/icons';

const { Item } = Form;

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
			<Item name="username" label="用户名">
				<Input maxLength={100} />
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

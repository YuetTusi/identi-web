import React, { FC, MouseEvent } from 'react';
import { SearchOutlined } from '@ant-design/icons/lib/icons';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import { DictCategory } from '@/schema/dict';
import { SearchFormProp } from './props';

const { Item } = Form;
const { Option } = Select;

/**
 * 查询表单
 */
const SearchForm: FC<SearchFormProp> = ({ formRef, onSearchFormSubmit }) => {

	/**
	 * 查询表单
	 */
	const onSubmit = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const formData = formRef.getFieldsValue();
		onSearchFormSubmit(formData);
	};

	return (
		<Form form={formRef} layout="inline">
			<Item name="category" label="字典分类" initialValue="">
				<Select style={{ width: '180px' }}>
					<Option value="">全部</Option>
					<Option value={DictCategory.CaseType}>{DictCategory.CaseType}</Option>
					<Option value={DictCategory.CertificateType}>
						{DictCategory.CertificateType}
					</Option>
					<Option value={DictCategory.Ethnicity}>{DictCategory.Ethnicity}</Option>
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

export { SearchForm };

import React, { FC, useState } from 'react';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import { SearchFormProp } from './props';
import { useEffect } from 'react';
import { request } from '@/utility/request';
import { SearchOutlined } from '@ant-design/icons/lib/icons';

const { Item } = Form;
const { Option } = Select;

/**
 * 查询表单
 */
const SearchForm: FC<SearchFormProp> = ({ formRef, onSearchFormSubmit }) => {
	const [options, setOptions] = useState<Record<string, any>[]>([]);

	useEffect(() => {
		(async () => {
			try {
				let { code, data } = await request<any[]>({
					url: 'resource/has-parent',
					method: 'GET'
				});

				if (code === 0) {
					setOptions(data);
				}
				formRef.setFieldsValue({ id: '' });
			} catch (error) {
				console.log(error.message);
			}
		})();
	}, []);

	const getOptions = (data: any[]) =>
		data.map((item, i) => (
			<Option value={item.id} key={`K_${i}`}>
				{item.name}
			</Option>
		));

	const onSubmit = () => {
		const formData = formRef.getFieldsValue();
		onSearchFormSubmit(formData);
	};

	return (
		<Form form={formRef} layout="inline">
			<Item name="id" label="上级资源">
				<Select style={{ width: '180px' }}>
					<Option value="">全部</Option>
					{getOptions(options)}
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

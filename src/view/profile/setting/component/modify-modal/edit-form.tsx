import React, { FC, useEffect } from 'react';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import { Mail, OnlyNumber } from '@/utility/regex';
import { EditFormProp } from './props';

const { Item } = Form;

const EditForm: FC<EditFormProp> = ({ data, formRef }) => {
	useEffect(() => {
		const { setFieldsValue } = formRef;
		if (data) {
			setFieldsValue(data);
		}
	}, [data]);

	return (
		<Form layout="vertical" form={formRef}>
			<Item
				name="mail"
				label="邮箱"
				rules={[{ pattern: Mail, message: '请输入正确的邮箱格式' }]}>
				<Input />
			</Item>
			<Item
				name="mobile"
				label="手机/电话"
				rules={[{ pattern: OnlyNumber, message: '请输入数字' }]}>
				<Input maxLength={16} />
			</Item>
			<Item name="realname" label="真实姓名">
				<Input maxLength={20} />
			</Item>
			<Item name="desc" label="描述">
				<Input maxLength={100} />
			</Item>
		</Form>
	);
};

export { EditForm };

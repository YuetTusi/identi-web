import React, { FC, MouseEvent } from 'react';
import dayjs from 'dayjs';
import Button from 'antd/lib/button';
import Datepicker from 'antd/lib/date-picker';
import Input from 'antd/lib/input';
import Form, { FormInstance } from 'antd/lib/form';
import { FormValue } from '../../begin/props';

const { Item, useForm } = Form;
const { TextArea } = Input;

interface IdentiFormProp {
	/**
	 * 表单数据handle
	 */
	onData: (data: FormValue) => void;
}

/**
 * 鉴定表单
 */
const IdentiForm: FC<IdentiFormProp> = (props) => {
	const { onData } = props;
	const [formRef] = useForm<FormValue>();

	/**
	 * 提交结果
	 */
	const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		try {
			const next = await formRef.validateFields();
			onData(next);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Form form={formRef} layout="vertical">
			<Item
				name="rec_time"
				label="鉴定时间"
				initialValue={dayjs()}
				rules={[{ required: true, message: '请选择鉴定时间' }]}>
				<Datepicker placeholder="案件鉴定时间" />
			</Item>
			<Item name="rec_place" label="鉴定地点">
				<Input />
			</Item>
			<Item
				name="suggest"
				label="鉴定意见"
				rules={[{ required: true, message: '请填写鉴定意见' }]}>
				<TextArea />
			</Item>
			<Item>
				<Button onClick={onSubmit} type="primary">
					提交
				</Button>
			</Item>
		</Form>
	);
};

export default IdentiForm;

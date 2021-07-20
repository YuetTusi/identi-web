import React, { FC, MouseEvent } from 'react';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Form, { FormInstance } from 'antd/lib/form';
import { FormValue } from '../../begin/props';

const { Item, useForm } = Form;
const { TextArea } = Input;

interface RejectFormProp {
	/**
	 * 表单数据handle
	 */
	onData: (data: FormValue) => void;
}

/**
 * 驳回表单
 */
const RejectForm: FC<RejectFormProp> = (props) => {
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
				name="action_note"
				label="驳回原因"
				rules={[{ required: true, message: '请填写驳回原因' }]}>
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

export default RejectForm;

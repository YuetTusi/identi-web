import React, { FC, MouseEvent, useEffect } from 'react';
import Button from 'antd/lib/button';
import InputNumber from 'antd/lib/input-number';
import Form from 'antd/lib/form';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import Modal from 'antd/lib/modal';
import { EditSeqModalProp, FormValue } from './props';

const { Item, useForm } = Form;

/**
 * 编辑顺序Modal
 */
const EditSeqModal: FC<EditSeqModalProp> = ({ data, visible, onOk, onCancel }) => {
	const [formRef] = useForm<FormValue>();

	useEffect(() => {
		formRef.setFieldsValue({ seq: data?.seq ?? 0 });
	}, [data]);

	const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		try {
			const values = await formRef.validateFields();
			onOk(data.id, values.seq);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal
			footer={[
				<Button onClick={onCancel} type="default" key="B_0">
					<CloseCircleOutlined />
					<span>取消</span>
				</Button>,
				<Button onClick={onSubmit} type="primary" key="B_1">
					<CheckCircleOutlined />
					<span>确定</span>
				</Button>
			]}
			onCancel={onCancel}
			visible={visible}
			title="更新顺序"
			centered={true}
			destroyOnClose={true}
			forceRender={true}
			maskClosable={false}>
			<Form
				form={formRef}
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 18 }}
				layout="horizontal">
				<Item name="seq" label="顺序" rules={[{ required: true, message: '请填写顺序' }]}>
					<InputNumber min={0} style={{ width: '100%' }} />
				</Item>
			</Form>
		</Modal>
	);
};

export default EditSeqModal;

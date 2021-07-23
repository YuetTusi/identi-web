import React, { FC, MouseEvent } from 'react';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal';
import { FormValue, ResetModalProp } from './props';

const { Item, useForm } = Form;
const { Password } = Input;

/**
 * 重置密码框
 */
const ResetModal: FC<ResetModalProp> = (props) => {
	const { visible, data, onCancel, onOk } = props;
	const [resetFormRef] = useForm<FormValue>();

	const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		try {
			const { password } = await resetFormRef.validateFields();
			onOk(data!.id, password);
		} catch (error) {
			console.warn(error.message);
		}
	};

	return (
		<Modal
			footer={[
				<Button
					onClick={() => {
						resetFormRef.resetFields();
						onCancel();
					}}
					type="default"
					key="K_0">
					<CloseCircleOutlined />
					<span>取消</span>
				</Button>,
				<Button onClick={onSubmit} type="primary" key="K_1">
					<CheckCircleOutlined />
					<span>确定</span>
				</Button>
			]}
			visible={visible}
			title={`重置密码（${data?.username ?? ''}）`}
			onCancel={() => {
				resetFormRef.resetFields();
				onCancel();
			}}
			forceRender={true}
			destroyOnClose={true}
			centered={true}
			maskClosable={false}>
			<Form layout="vertical" form={resetFormRef}>
				<Item name="password" label="密码" rules={[{ required: true }]}>
					<Password />
				</Item>
				<Item
					name="repassword"
					label="重复密码"
					dependencies={['password']}
					rules={[
						{ required: true, message: '请重复输入密码' },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('请确认与密码输入一致'));
							}
						})
					]}>
					<Password />
				</Item>
			</Form>
		</Modal>
	);
};

ResetModal.defaultProps = {
	visible: false,
	onOk: () => {},
	onCancel: () => {}
};

export default ResetModal;

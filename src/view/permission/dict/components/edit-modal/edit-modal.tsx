import React, { FC, MouseEvent, useEffect } from 'react';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Form from 'antd/lib/form';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
import { DictCategory} from '@/schema/dict';
import { request } from '@/utility/request';
import { EditModalProp } from '../../props';

const { Option } = Select;
const { Item } = Form;

/**
 * 添加/编辑Modal
 */
const EditModal: FC<EditModalProp> = ({ formRef, visible, id, onOk, onCancel }) => {
	useEffect(() => {
		const { setFieldsValue, resetFields } = formRef;
		(async () => {
			if (visible && id !== undefined) {
				const { code, data } = await request({
					url: `dict/${id}`,
					method: 'GET'
				});
				if (code === 0) {
					setFieldsValue(data);
				}
			} else {
				resetFields();
			}
		})();
	}, [id, visible]);

	const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		const { validateFields } = formRef;
		event.preventDefault();
		try {
			const values = await validateFields();
			onOk(values);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal
			footer={[
				<Button
					onClick={() => {
						onCancel();
					}}
					key="B_0">
					<CheckCircleOutlined />
					<span>取消</span>
				</Button>,
				<Button onClick={onSubmit} type="primary" key="B_1">
					<CloseCircleOutlined />
					<span>确定</span>
				</Button>
			]}
			title={id ? '编辑字典' : '添加字典'}
			onCancel={onCancel}
			visible={visible}
			maskClosable={false}
			centered={true}
			forceRender={true}
			destroyOnClose={true}>
			<Form form={formRef} layout="vertical">
				<Item name="name" label="名称" rules={[{ required: true, message: '请填写名称' }]}>
					<Input />
				</Item>
				<Item name="value" label="值" rules={[{ required: true, message: '请填写值' }]}>
					<Input />
				</Item>
				<Item name="seq" label="顺序" initialValue={0}>
					<InputNumber min={0} style={{ width: '100%' }} />
				</Item>
				<Item name="category" label="分类" initialValue={DictCategory.CaseType}>
					<Select>
						<Option value={DictCategory.CaseType}>{DictCategory.CaseType}</Option>
						<Option value={DictCategory.CertificateType}>
							{DictCategory.CertificateType}
						</Option>
						<Option value={DictCategory.Ethnicity}>{DictCategory.Ethnicity}</Option>
					</Select>
				</Item>
			</Form>
		</Modal>
	);
};

EditModal.defaultProps = {
	visible: false,
	onOk: () => {},
	onCancel: () => {}
};

export default EditModal;

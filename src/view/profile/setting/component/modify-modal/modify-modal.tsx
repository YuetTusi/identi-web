import React, { FC } from 'react';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import { User } from '@/schema/user';
import { helper } from '@/utility/helper';
import { EditForm } from './edit-form';
import { ModifyModalProp } from './props';

const { useForm } = Form;

/**
 * 修改用户信息Modal
 */
const ModifyModal: FC<ModifyModalProp> = ({ data, visible, onCancel, onOk }) => {
	const [formRef] = useForm<User>();

	const onModifySave = async (data: User) => {
		const { validateFields } = formRef;
		try {
			const values = await validateFields();
			onOk({
				...values,
				id: helper.getUId()!
			});
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
				<Button onClick={() => onModifySave(data!)} type="primary" key="B_1">
					<SaveOutlined />
					<span>确定</span>
				</Button>
			]}
			title={`修改信息（${data?.username ?? ''}）`}
			onCancel={onCancel}
			visible={visible}
			maskClosable={false}
			centered={true}
			destroyOnClose={true}>
			<EditForm formRef={formRef} data={data!} />
		</Modal>
	);
};

ModifyModal.defaultProps = {
	visible: false,
	onOk: () => {},
	onCancel: () => {}
};

export default ModifyModal;

import React, { FC, useState } from 'react';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal';
import { request } from '@/utility/request';
import { User } from '@/schema/user';
import { useEffect } from 'react';
import { Role } from '@/schema/role';
import { RoleFormBox } from '../styled/layout-box';
import { FormValue, RoleModalProp } from './props';

const { Item, useForm } = Form;
const { Option } = Select;

/**
 * 更新角色modal
 */
const RoleModal: FC<RoleModalProp> = (props) => {
	const { data, visible, onOk, onCancel } = props;
	const [roleData, setRoleData] = useState<Role[]>([]);
	const [form] = useForm<FormValue>();

	useEffect(() => {
		//查询全部角色
		(async () => {
			try {
				const { code, data: roleData } = await request<Role[]>({
					url: `role`,
					method: 'GET'
				});
				if (code === 0) {
					setRoleData(roleData);
				}
			} catch (error) {
				message.destroy();
				message.error('读取角色数据失败');
				console.log(error);
			}
		})();
	}, []);

	useEffect(() => {
		//查询用户拥有角色
		(async (data?: User) => {
			if (data?.id) {
				try {
					const { code, data: roleData } = await request<Role[]>({
						url: `user/role/${data.id}`,
						method: 'GET'
					});
					if (code === 0) {
						// setCurrentRoleData(roleData.map((item) => item.id));
						form.setFieldsValue({ roles: roleData.map((item) => item.id) });
					}
				} catch (error) {
					console.log(error);
				}
			}
		})(data);
	}, [data]);

	/**
	 * 绑定角色Option
	 * @param data 角色数据
	 */
	const bindOption = (data: Role[]) =>
		data.map((item) => (
			<Option value={item.id} key={item.id}>{`${item.name}（${item.desc ?? ''}）`}</Option>
		));

	return (
		<Modal
			footer={[
				<Button onClick={() => onCancel()} type="default" key="K_0">
					<CloseCircleOutlined />
					<span>取消</span>
				</Button>,
				<Button
					onClick={() => {
						const { roles } = form.getFieldsValue();
						onOk(data!.id, roles);
					}}
					type="primary"
					key="K_1">
					<CheckCircleOutlined />
					<span>确定</span>
				</Button>
			]}
			onCancel={onCancel}
			visible={visible}
			title={`设置角色${data?.username ? `（${data.username}）` : ''}`}
			width={600}
			forceRender={true}
			destroyOnClose={true}
			maskClosable={false}
			centered={true}>
			<RoleFormBox>
				<Form form={form}>
					<Item label="角色" name="roles">
						<Select placeholder="请选择拥有角色" mode="multiple">
							{bindOption(roleData)}
						</Select>
					</Item>
				</Form>
			</RoleFormBox>
		</Modal>
	);
};

RoleModal.defaultProps = {
	visible: false,
	onCancel: () => {}
};

export default RoleModal;

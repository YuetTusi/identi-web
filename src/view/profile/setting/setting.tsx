import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import EditOutlined from '@ant-design/icons/EditOutlined';
import RollbackOutlined from '@ant-design/icons/RollbackOutlined';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import { User } from '@/schema/user';
import { StateTree } from '@/schema/model-type';
import { SettingStoreState } from '@/model/profile/setting';
import { helper } from '@/utility/helper';
import { BorderBox, StrongBox } from '@/component/styled/container';
import { ButtonBar } from './component/styled/style-box';
import ResetModal from './component/reset-modal';
import ModifyModal from './component/modify-modal';
import UserInfo from './user-info';
import { SettingProp } from './props';

/**
 * 个人设置
 */
const Setting: FC<SettingProp> = () => {
	const dispatch = useDispatch();
	const { data } = useSelector<StateTree, SettingStoreState>((state) => state.setting);
	const [resetModalVisible, setResetModalVisible] = useState<boolean>(false);
	const [modifyModalVisible, setModifyModalVisible] = useState<boolean>(false);

	useEffect(() => {
		const uid = helper.getUId();
		dispatch({ type: 'setting/queryUserById', payload: uid });
	}, []);

	/**
	 * 重置密码
	 * @param id 用户id
	 * @param newPassword 新密码
	 */
	const onResetPassword = (id: string, newPassword: string) =>
		Modal.confirm({
			onOk() {
				dispatch({
					type: 'setting/resetPassword',
					payload: {
						id,
						password: newPassword
					}
				});
			},
			title: '重置密码',
			content: '确认重置密码？',
			okText: '是',
			cancelText: '否'
		});

	/**
	 * 更新用户
	 * @param next 用户
	 */
	const onModifySave = (next: User) =>
		Modal.confirm({
			onOk() {
				dispatch({
					type: 'setting/update',
					payload: next
				});
				setModifyModalVisible(false);
			},
			title: '更新用户信息',
			content: '确认更新用户信息？',
			okText: '是',
			cancelText: '否'
		});

	return (
		<>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>用户设置</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>
			<BorderBox marginTop="10px" marginBottom="10px">
				<ButtonBar>
					<div />
					<div>
						<Button onClick={() => setResetModalVisible(true)} type="primary">
							<RollbackOutlined />
							<span>重置密码</span>
						</Button>
						<Button onClick={() => setModifyModalVisible(true)} type="primary">
							<EditOutlined />
							<span>修改信息</span>
						</Button>
					</div>
				</ButtonBar>
			</BorderBox>
			{data.length === 0 ? null : <UserInfo {...data[0]} />}
			<ResetModal
				visible={resetModalVisible}
				data={data[0]}
				onOk={onResetPassword}
				onCancel={() => setResetModalVisible(false)}
			/>
			<ModifyModal
				visible={modifyModalVisible}
				data={data[0]}
				onOk={onModifySave}
				onCancel={() => setModifyModalVisible(false)}
			/>
		</>
	);
};

export default Setting;

import React, { FC, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import dayjs from 'dayjs';
import Button from 'antd/lib/button';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import Modal from 'antd/lib/modal';
import { StateTree } from '@/schema/model-type';
import { User } from '@/schema/user';
import { CaseRec } from '@/schema/case-rec';
import { CaseState, LawCase } from '@/schema/law-case';
import { IssueModalStoreState } from '@/model/permission/component/issue-modal';
import { useUserList } from '@/hook';
import { helper } from '@/utility/helper';
import { FormValue, IssueModalProp } from './props';

const { Item, useForm } = Form;
const { Option } = Select;

/**
 * 验证是否需要更新案件（鉴定人&审核人是否更换）
 * @param lawCase 案件数据
 * @param identi_id 鉴定人id
 * @param check_id 审核人id
 * @returns {boolean} 是否需要更新案件
 */
const needUpdateCase = (lawCase: LawCase, nextIdentiId: string, nextCheckId: string) =>
	!(lawCase.identi_id === nextIdentiId && lawCase.check_id === nextCheckId);

/**
 * 下发鉴定弹框
 */
const IssueModal: FC<Partial<IssueModalProp>> = () => {
	const dispatch = useDispatch();
	const userList = useUserList();
	const [form] = useForm<FormValue>();
	const { visible, data } = useSelector<StateTree, IssueModalStoreState>(
		(state) => state.issueModal
	);
	const onCancel = () => dispatch({ type: 'issueModal/setVisible', payload: false });

	useEffect(() => {
		if (data) {
			form.setFieldsValue({
				check_id: data.check_id,
				identi_id: data.identi_id
			});
		}
	}, [data]);

	/**
	 * 绑定用户select
	 * @param data 用户数据
	 * @returns
	 */
	const bindUserList = (data: User[]) => {
		if (data && data.length > 0) {
			return data.map((item) => (
				<Option value={item.id} key={item.id}>
					{item.realname ? `${item.username}(${item.realname})` : item.username}
				</Option>
			));
		} else {
			return <Option value="">---</Option>;
		}
	};

	return (
		<Modal
			footer={[
				<Button onClick={() => onCancel()} type="default" key="K_0">
					<CloseCircleOutlined />
					<span>取消</span>
				</Button>,
				<Button
					onClick={async () => {
						try {
							const { identi_id, check_id, action_note } =
								await form.validateFields();
							const { username, realname } = userList.find(
								(item) => item.id === identi_id
							)!;
							Modal.confirm({
								onOk() {
									let now = dayjs().format('YYYY-MM-DD HH:mm:ss');
									const rec: CaseRec = {
										id: helper.newId(),
										case_id: data?.id!,
										action_note,
										action_time: now,
										create_time: now,
										update_time: now
									};
									if (data && needUpdateCase(data!, identi_id, check_id)) {
										dispatch({
											type: 'issueModal/issue',
											payload: {
												caseRec: rec,
												lawCase: {
													...data,
													identi_id,
													check_id,
													state: CaseState.ToBeIdenti
												}
											}
										});
									} else {
										dispatch({
											type: 'issueModal/issue',
											payload: {
												caseRec: rec,
												lawCase: {
													...data,
													state: CaseState.ToBeIdenti
												}
											}
										});
									}
								},
								okText: '是',
								cancelText: '否',
								title: '指派鉴定',
								content: `确认「${data?.case_name}」由鉴定人「${username ?? ''} ${
									realname ?? ''
								}」处理？`
							});
						} catch (error) {
							console.log(error);
						}
					}}
					type="primary"
					key="K_1">
					<CheckOutlined />
					<span>确定</span>
				</Button>
			]}
			onCancel={onCancel}
			visible={visible}
			title="指派鉴定"
			forceRender={true}
			maskClosable={false}
			destroyOnClose={true}
			centered={true}>
			<div>
				<div>
					<Form form={form} layout="horizontal">
						<Item label="鉴定人" name="identi_id">
							<Select style={{ width: '200px' }}>{bindUserList(userList)}</Select>
						</Item>
						<Item label="审核人" name="check_id">
							<Select style={{ width: '200px' }}>{bindUserList(userList)}</Select>
						</Item>
						<Item label="说明" name="action_note" initialValue="">
							<Input maxLength={200} />
						</Item>
					</Form>
				</div>
			</div>
		</Modal>
	);
};

export default memo(IssueModal);

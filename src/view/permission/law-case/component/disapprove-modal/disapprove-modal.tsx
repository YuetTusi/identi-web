import React, { FC, memo } from 'react';
import { connect, routerRedux, useDispatch } from 'dva';
import dayjs from 'dayjs';
import { v4 as newId } from 'uuid';
import Button from 'antd/lib/button';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Modal from 'antd/lib/modal';
import { CaseRec } from '@/schema/case-rec';
import { DisapproveModalProp } from './props';
import { CaseState } from '@/schema/law-case';

const { Item, useForm } = Form;

/**
 * 审核不通过弹框
 */
const DisapproveModal: FC<Partial<DisapproveModalProp>> = (props) => {
	const dispatch = useDispatch();
	const [form] = useForm<{ action_note: string }>();
	const { visible, data } = props.disapproveModal!;
	const onCancel = () => {
		form.resetFields();
		dispatch({ type: 'disapproveModal/setVisible', payload: false });
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
							const values = await form.validateFields();
							Modal.confirm({
								onOk() {
									try {
										const rec: CaseRec = {
											id: newId(),
											case_id: data?.id!,
											action_note: values.action_note,
											action_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
											create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
											update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
										};
										dispatch({
											type: 'disapproveModal/issueAfterReject',
											payload: {
												caseRec: rec,
												lawCase: {
													...data,
													state: CaseState.ToBeIdenti
												}
											}
										});
										dispatch(routerRedux.push('/permission/law-case'));
									} catch (error) {
										console.log(error);
									}
								},
								okText: '是',
								cancelText: '否',
								title: '不通过审核',
								content: `确认「${data?.case_name}」不通过，并重新鉴定？`
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
			title="审核不通过"
			forceRender={true}
			maskClosable={false}
			destroyOnClose={true}
			centered={true}>
			<div>
				<p>
					<label>鉴定人：</label>
					<span>{data?.identi_username ?? ''}</span>
				</p>
				<p>
					<label>案件名称：</label>
					<span>{data?.case_name ?? ''}</span>
				</p>
				<div>
					<Form form={form} layout="horizontal">
						<Item
							label="说明"
							name="action_note"
							initialValue=""
							rules={[{ required: true, message: '请填写说明' }]}>
							<Input />
						</Item>
					</Form>
				</div>
			</div>
		</Modal>
	);
};

export default memo(
	connect((state: any) => ({ disapproveModal: state.disapproveModal }))(DisapproveModal)
);

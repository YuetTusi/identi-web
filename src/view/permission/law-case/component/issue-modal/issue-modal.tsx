import React, { FC, memo } from 'react';
import { connect, useDispatch } from 'dva';
import dayjs from 'dayjs';
import { v4 as newId } from 'uuid';
import Button from 'antd/lib/button';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Modal from 'antd/lib/modal';
import { CaseRec } from '@/schema/case-rec';
import { IssueModalProp } from './props';

const { Item, useForm } = Form;

/**
 * 下发鉴定弹框
 */
const IssueModal: FC<Partial<IssueModalProp>> = (props) => {
	const dispatch = useDispatch();
	const [form] = useForm<{ action_note: string }>();
	const { visible, data } = props.issueModal!;
	const onCancel = () => dispatch({ type: 'issueModal/setVisible', payload: false });

	return (
		<Modal
			footer={[
				<Button onClick={() => onCancel()} type="default" key="K_0">
					<CloseCircleOutlined />
					<span>取消</span>
				</Button>,
				<Button
					onClick={() => {
						Modal.confirm({
							onOk() {
								const rec: CaseRec = {
									id: newId(),
									case_id: data?.id!,
									action_note: form.getFieldsValue().action_note,
									action_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
									create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
									update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
								};
								dispatch({
									type: 'issueModal/issue',
									payload: { caseRec: rec, state: 1 }
								});
							},
							okText: '是',
							cancelText: '否',
							title: '指派鉴定',
							content: `确认「${data?.case_name}」由鉴定人「${(
								data?.identi_username ?? ''
							).trim()}」处理？`
						});
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
				<p>请确认鉴定人员</p>
				<p>
					<label>鉴定人：</label>
					<span>{data?.identi_username ?? ''}</span>
				</p>
				<p>
					<label>审核人：</label>
					<span>{data?.check_username ?? ''}</span>
				</p>
				<div>
					<Form form={form} layout="horizontal">
						<Item label="说明" name="action_note" initialValue="">
							<Input />
						</Item>
					</Form>
				</div>
			</div>
		</Modal>
	);
};

export default memo(connect((state: any) => ({ issueModal: state.issueModal }))(IssueModal));

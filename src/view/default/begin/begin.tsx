import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'dva';
import { routerRedux, Link, useParams } from 'dva/router';
import dayjs from 'dayjs';
import { v4 as newId } from 'uuid';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Divider from 'antd/lib/divider';
import Empty from 'antd/lib/empty';
import Radio from 'antd/lib/radio';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import { BorderBox, LabelBox, StrongBox } from '@/component/styled/container';
import AttachmentList from '@/component/attachment/attachment-list';
import { useLastRec } from '@/hook';
import { request } from '@/utility/request';
import { helper } from '@/utility/helper';
import { CaseState, LawCase } from '@/schema/law-case';
import { CaseRec } from '@/schema/case-rec';
import { LawCase4Table } from '@/view/default/props';
import { ListView } from '@/component/styled/widget';
import IdentiForm from '../component/identi-form';
import RejectForm from '../component/reject-form';
import { BeginProp, FormValue } from './props';

const { Group } = Radio;

/**
 * 鉴定页
 * @param props
 * @returns
 */
const Begin: FC<BeginProp> = (props) => {
	const dispatch = useDispatch();
	const { id } = useParams<{ id: string }>(); //案件id
	const [lawCase, setLawCase] = useState<LawCase4Table>();
	const [action, setAction] = useState<string>('1');
	const rec = useLastRec(id);

	useEffect(() => {
		message.destroy();
		(async () => {
			try {
				const { code, data, error } = await request<LawCase>({
					url: `law-case/${id}`,
					method: 'GET'
				});
				if (code === 0) {
					setLawCase(data);
				} else {
					message.error(`读取案件数据失败:${error?.message ?? ''}`);
				}
			} catch (error) {
				message.error('读取案件数据失败');
			}
		})();
	}, [id]);

	/**
	 * 案件详情
	 */
	const renderDetail = () => {
		if (lawCase) {
			return (
				<ListView>
					<li>
						<label>鉴定人：</label>
						<span>{lawCase.identi_username}</span>
					</li>
					<li>
						<label>审核人：</label>
						<span>{lawCase.check_username}</span>
					</li>
					<li>
						<label>案件名称：</label>
						<span>{lawCase.case_name}</span>
					</li>
					<li>
						<label>检验单位：</label>
						<span>{lawCase.check_unit_name}</span>
					</li>
					<li>
						<label>采集人员编号：</label>
						<span>{lawCase.officer_no}</span>
					</li>
					<li>
						<label>采集人员：</label>
						<span>{lawCase.officer_name}</span>
					</li>
					<li>
						<label>网安部门案件编号：</label>
						<span>{lawCase.security_case_no}</span>
					</li>
					<li>
						<label>网安部门案件名称：</label>
						<span>{lawCase.security_case_name}</span>
					</li>
					<li>
						<label>网安部门案件类别：</label>
						<span>{lawCase.security_case_type}</span>
					</li>
					<li>
						<label>执法办案系统案件编号：</label>
						<span>{lawCase.handle_case_no}</span>
					</li>
					<li>
						<label>执法办案系统案件名称：</label>
						<span>{lawCase.handle_case_name}</span>
					</li>
					<li>
						<label>执法办案系统案件类别：</label>
						<span>{lawCase.handle_case_type}</span>
					</li>
				</ListView>
			);
		} else {
			return <Empty />;
		}
	};

	/**
	 * 表单反馈结果数据
	 * @param formData 表单数据
	 */
	const onData = (formData: FormValue) => {
		const next: CaseRec = {
			id: newId(),
			case_id: id,
			rec_time: helper.isNullOrUndefined(formData.rec_time)
				? undefined
				: formData.rec_time.format('YYYY-MM-DD'),
			rec_place: formData.rec_place,
			suggest: formData.suggest,
			action_note: formData.action_note,
			action_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
		};
		Modal.confirm({
			onOk() {
				request<boolean>({
					url: '/rec/append',
					method: 'POST',
					data: {
						form: {
							caseRec: next,
							lawCase: {
								...lawCase,
								state: action === '0' ? CaseState.Reject : CaseState.Approval
							}
						}
					}
				})
					.then(({ code, data, error }) => {
						if (code === 0 && data) {
							message.success(
								action === '0' ? '驳回成功' : '鉴定结果已提交，请等待审核'
							);
							dispatch(routerRedux.push('/default'));
						} else {
							console.log(error);
							message.error('提交失败');
						}
					})
					.catch((err) => {
						message.error(`提交失败 ${err.message}`);
					});
			},
			content: action === '0' ? '确认驳回案件？' : '确认提交鉴定？',
			okText: '是',
			cancelText: '否',
			title: '确认'
		});
	};

	/**
	 * 根据动作类型渲染表单
	 * @param type action类型
	 * @returns
	 */
	const renderForm = (type: string) => {
		switch (type) {
			case '0':
				return <RejectForm onData={onData} />;
			case '1':
				return <IdentiForm onData={onData} />;
			default:
				return null;
		}
	};

	return (
		<>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/default">我的案件</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>鉴定「{lawCase?.case_name ?? ''}」</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>
			<LabelBox marginTop="10px">
				<legend>案件信息</legend>
				{renderDetail()}
			</LabelBox>
			<LabelBox marginTop="10px">
				<legend>附件</legend>
				<AttachmentList caseId={id} />
			</LabelBox>
			<LabelBox marginTop="10px">
				<legend>说明信息</legend>
				<ListView>
					<li>
						<label>说明：</label>
						<span>{rec?.action_note}</span>
					</li>
				</ListView>
			</LabelBox>
			<BorderBox marginTop="10px">
				<Group value={action} onChange={(e) => setAction(e.target.value)}>
					<Radio value="1">鉴定</Radio>
					<Radio value="0">驳回</Radio>
				</Group>
				<Divider />
				{renderForm(action)}
			</BorderBox>
		</>
	);
};

export default Begin;

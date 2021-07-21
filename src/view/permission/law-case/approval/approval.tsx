import React, { FC, MouseEvent, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { routerRedux, useDispatch, useParams } from 'dva';
import { Link } from 'dva/router';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import { useLastRec } from '@/hook';
import { request } from '@/utility/request';
import { CaseState, LawCase } from '@/schema/law-case';
import CaseDesc from './case-desc';
import DisapproveModal from '../component/disapprove-modal';
import { LawCase4Table } from '../props';
import { ApprovalProp } from './props';

/**
 * 审核页
 */
const Approval: FC<ApprovalProp> = (props) => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const lastRec = useLastRec(id);
	const [lawCase, setLawCase] = useState<LawCase4Table>();

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
	 * 审核通过Click
	 */
	const onApproveClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		Modal.confirm({
			async onOk() {
				try {
					const { code, data, error } = await request<number>({
						url: `law-case/state/${id}`,
						data: { form: { state: CaseState.Finish } },
						method: 'PUT'
					});
					if (code === 0 && data > 0) {
						message.success('审核完成');
						dispatch(routerRedux.push('/permission/law-case'));
					} else {
						console.log(error);
						message.error('审核失败');
					}
				} catch (error) {
					console.log(error);
					message.error(`审核失败：${error.message}`);
				}
			},
			okText: '是',
			cancelText: '否',
			title: '通过审核',
			content: `确认「${lawCase?.case_name ?? ''}」审核通过？`
		});
	};

	/**
	 * 审核不通过Click
	 */
	const onDisapproveClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		dispatch({ type: 'disapproveModal/setData', payload: lawCase });
		dispatch({ type: 'disapproveModal/setVisible', payload: true });
	};

	return (
		<>
			<Breadcrumb>
				<BreadcrumbItem>
					<Link to="/permission/law-case">案件管理</Link>
				</BreadcrumbItem>
				<BreadcrumbItem>审核「{lawCase?.case_name ?? ''}」</BreadcrumbItem>
			</Breadcrumb>
			<CaseDesc data={lawCase} />
			<Divider />
			<div>
				<div>
					<label>鉴定时间：</label>
					<span>{dayjs(lastRec?.rec_time).format('YYYY-MM-DD')}</span>
				</div>
				<div>
					<label>鉴定地点：</label>
					<span>{lastRec?.rec_place}</span>
				</div>
				<div>
					<label>鉴定意见：</label>
					<span>{lastRec?.suggest}</span>
				</div>
				<div>
					<Button onClick={onApproveClick} type="primary">
						审核通过
					</Button>
					<Button onClick={onDisapproveClick} type="primary" danger={true}>
						审核不通过
					</Button>
				</div>
			</div>
			<DisapproveModal />
		</>
	);
};

export default Approval;

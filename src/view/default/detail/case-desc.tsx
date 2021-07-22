import React, { FC, memo } from 'react';
import Empty from 'antd/lib/empty';
import Tag from 'antd/lib/tag';
import { ListView } from '@/component/styled/widget';
import { LawCase4Table } from '../props';
import { CaseState } from '@/schema/law-case';

/**
 * 状态标签
 */
const StateTag: FC<{ state: CaseState }> = (props) => {
	const { state } = props;
	switch (state) {
		case CaseState.NotIdenti:
			return <Tag style={{ margin: 0 }}>未鉴定</Tag>;
		case CaseState.ToBeIdenti:
			return (
				<Tag color="blue" style={{ margin: 0 }}>
					待鉴定
				</Tag>
			);
		case CaseState.Reject:
			return (
				<Tag color="orange" style={{ margin: 0 }}>
					驳回
				</Tag>
			);
		case CaseState.Approval:
			return (
				<Tag color="cyan" style={{ margin: 0 }}>
					审核
				</Tag>
			);
		case CaseState.Finish:
			return (
				<Tag color="green" style={{ margin: 0 }}>
					完成
				</Tag>
			);
		default:
			return <Tag style={{ margin: 0 }}>未知</Tag>;
	}
};

/**
 * 案件信息展示
 */
const CaseDesc: FC<{ data?: LawCase4Table }> = (props) => {
	const { data } = props;
	if (data) {
		return (
			<ListView>
				<li>
					<label>状态：</label>
					<span>
						<StateTag state={data.state!} />
					</span>
				</li>
				<li>
					<label>鉴定人：</label>
					<span>{data.identi_username}</span>
				</li>
				<li>
					<label>审核人：</label>
					<span>{data.check_username}</span>
				</li>
				<li>
					<label>案件名称：</label>
					<span>{data.case_name}</span>
				</li>
				<li>
					<label>检验单位：</label>
					<span>{data.check_unit_name}</span>
				</li>
				<li>
					<label>采集人员编号：</label>
					<span>{data.officer_no}</span>
				</li>
				<li>
					<label>采集人员：</label>
					<span>{data.officer_name}</span>
				</li>
				<li>
					<label>网安部门案件编号：</label>
					<span>{data.security_case_no}</span>
				</li>
				<li>
					<label>网安部门案件名称：</label>
					<span>{data.security_case_name}</span>
				</li>
				<li>
					<label>网安部门案件类别：</label>
					<span>{data.security_case_type}</span>
				</li>
				<li>
					<label>执法办案系统案件编号：</label>
					<span>{data.handle_case_no}</span>
				</li>
				<li>
					<label>执法办案系统案件名称：</label>
					<span>{data.handle_case_name}</span>
				</li>
				<li>
					<label>执法办案系统案件类别：</label>
					<span>{data.handle_case_type}</span>
				</li>
			</ListView>
		);
	} else {
		return <Empty description="暂无案件信息" />;
	}
};

export default memo(CaseDesc);

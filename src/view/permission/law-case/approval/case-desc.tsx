import React, { FC, memo } from 'react';
import Empty from 'antd/lib/empty';
import { ListView } from '@/component/styled/widget';
import { LawCase4Table } from '../props';

/**
 * 案件信息展示
 */
const CaseDesc: FC<{ data?: LawCase4Table }> = (props) => {
	const { data } = props;
	if (data) {
		return (
			<ListView>
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

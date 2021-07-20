import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'dva/router';
import { request } from '@/utility/request';
import { LawCase } from '@/schema/law-case';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Empty from 'antd/lib/empty';
import message from 'antd/lib/message';
import { DetailProp, LawCase4Table } from './props';

/**
 * 案件详情页
 */
const Detail: FC<DetailProp> = (props) => {
	const { id } = useParams<{ id: string }>();
	const [lawCase, setLawCase] = useState<LawCase4Table>();

	useEffect(() => {
		message.destroy();
		(async () => {
			try {
				const { code, data, error } = await request<LawCase>({
					url: `default/${id}`,
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

	const renderDetail = () => {
		if (lawCase) {
			return (
				<div>
					<div>
						<label>鉴定人：</label>
						<span>{lawCase.identi_username}</span>
					</div>
					<div>
						<label>审核人：</label>
						<span>{lawCase.check_username}</span>
					</div>
					<div>
						<label>案件名称：</label>
						<span>{lawCase.case_name}</span>
					</div>
					<div>
						<label>检验单位：</label>
						<span>{lawCase.check_unit_name}</span>
					</div>
					<div>
						<label>采集人员编号：</label>
						<span>{lawCase.officer_no}</span>
					</div>
					<div>
						<label>采集人员：</label>
						<span>{lawCase.officer_name}</span>
					</div>
					<div>
						<label>网安部门案件编号：</label>
						<span>{lawCase.security_case_no}</span>
					</div>
					<div>
						<label>网安部门案件名称：</label>
						<span>{lawCase.security_case_name}</span>
					</div>
					<div>
						<label>网安部门案件类别：</label>
						<span>{lawCase.security_case_type}</span>
					</div>
					<div>
						<label>执法办案系统案件编号：</label>
						<span>{lawCase.handle_case_no}</span>
					</div>
					<div>
						<label>执法办案系统案件名称：</label>
						<span>{lawCase.handle_case_name}</span>
					</div>
					<div>
						<label>执法办案系统案件类别：</label>
						<span>{lawCase.handle_case_type}</span>
					</div>
				</div>
			);
		} else {
			return <Empty />;
		}
	};

	return (
		<>
			<Breadcrumb>
				<BreadcrumbItem>
					<Link to="/default">案件管理</Link>
				</BreadcrumbItem>
				<BreadcrumbItem>「{lawCase?.case_name}」详情</BreadcrumbItem>
			</Breadcrumb>
			{renderDetail()}
		</>
	);
};

export default Detail;

import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useDispatch } from 'dva';
import dayjs from 'dayjs';
import { Link, routerRedux, useParams } from 'dva/router';
import { useDict, useUserList } from '@/hook';
import { helper } from '@/utility/helper';
import { request } from '@/utility/request';
import { OfficerNumber } from '@/utility/regex';
import { DictCategory } from '@/schema/dict';
import { LawCase } from '@/schema/law-case';
import { User } from '@/schema/user';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import Button from 'antd/lib/button';
import Empty from 'antd/lib/empty';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
import { SearchBox } from '../styled/layout-box';
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
					<Link to="/permission/case">案件管理</Link>
				</BreadcrumbItem>
				<BreadcrumbItem>案件详情</BreadcrumbItem>
				<BreadcrumbItem>{lawCase?.case_name}</BreadcrumbItem>
			</Breadcrumb>
			{renderDetail()}
		</>
	);
};

export default Detail;

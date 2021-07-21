import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'dva/router';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Divider from 'antd/lib/divider';
import message from 'antd/lib/message';
import { useLastRec } from '@/hook';
import { request } from '@/utility/request';
import { LawCase } from '@/schema/law-case';
import CaseDesc from './case-desc';
import Record from './record';
import { DetailProp } from './props';
import { LawCase4Table } from '../props';

/**
 * 案件详情页
 */
const Detail: FC<DetailProp> = (props) => {
	const { id } = useParams<{ id: string }>();
	const lastRec = useLastRec(id);
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

	return (
		<>
			<Breadcrumb>
				<BreadcrumbItem>
					<Link to="/default">案件管理</Link>
				</BreadcrumbItem>
				<BreadcrumbItem>「{lawCase?.case_name}」详情</BreadcrumbItem>
			</Breadcrumb>
			<CaseDesc data={lawCase} />
			<Divider />
			<Record data={lastRec!} state={lawCase?.state!} />
		</>
	);
};

export default Detail;

import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'dva/router';
import dayjs from 'dayjs';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Divider from 'antd/lib/divider';
import message from 'antd/lib/message';
import { useLastRec } from '@/hook';
import { request } from '@/utility/request';
import { CaseState, LawCase } from '@/schema/law-case';
import CaseDesc from './case-desc';
import Record from './record';
import { DetailProp, LawCase4Table } from './props';

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

	const renderLastRec = () => {
		if (lawCase?.state === CaseState.Finish) {
			return (
				<div>
					<div>
						<label>鉴定时间：</label>
						<span>{dayjs(lastRec?.rec_time).format('YYYY-MM-DD')}</span>
					</div>
					<div>
						<label>鉴定地点：</label>
						<span>{lastRec?.rec_place ?? ''}</span>
					</div>
					<div>
						<label>鉴定意见：</label>
						<span>{lastRec?.suggest}</span>
					</div>
				</div>
			);
		} else {
			<div>
				<div>
					<label>操作时间：</label>
					<span>{dayjs(lastRec?.action_time).format('YYYY-MM-DD')}</span>
				</div>
				<div>
					<label>说明：</label>
					<span>{lastRec?.action_note ?? ''}</span>
				</div>
			</div>;
		}
	};

	return (
		<>
			<Breadcrumb>
				<BreadcrumbItem>
					<Link to="/permission/law-case">案件管理</Link>
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

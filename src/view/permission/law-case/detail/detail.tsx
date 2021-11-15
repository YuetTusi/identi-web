import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'dva/router';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import message from 'antd/lib/message';
import { LabelBox, StrongBox } from '@/component/styled/container';
import AttachmentList from '@/component/attachment/attachment-list';
import DeviceFold from '@/component/device-fold';
import { useCaseAttach, useLastRec } from '@/hook';
import { request } from '@/utility/request';
import { LawCase } from '@/schema/law-case';
import CaseDesc from './case-desc';
import Record from './record';
import { DetailProp, LawCase4Table } from './props';

/**
 * 案件详情页
 */
const Detail: FC<DetailProp> = () => {
	const { id } = useParams<{ id: string }>();
	const lastRec = useLastRec(id);
	const attachment = useCaseAttach(id);
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

	return (
		<>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/permission/law-case">案件管理</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>「{lawCase?.case_name}」详情</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>
			<LabelBox marginTop="10px">
				<legend>案件信息</legend>
				<CaseDesc data={lawCase} />
			</LabelBox>
			<LabelBox marginTop="10px">
				<legend>附件</legend>
				<AttachmentList data={attachment} />
			</LabelBox>
			<LabelBox marginTop="10px">
				<legend>设备</legend>
				<DeviceFold caseId={id} />
			</LabelBox>
			<LabelBox marginTop="10px">
				<legend>说明信息</legend>
				<Record data={lastRec!} state={lawCase?.state!} />
			</LabelBox>
		</>
	);
};

export default Detail;

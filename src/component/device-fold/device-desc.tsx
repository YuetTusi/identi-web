import dayjs from 'dayjs';
import React, { FC } from 'react';
import Divider from 'antd/lib/divider';
import Descriptions from 'antd/lib/descriptions';
import { useDeviceAttach } from '@/hook';
import { Suspect } from '@/schema/suspect';
import { helper } from '@/utility/helper';
import AttachmentList from '../attachment/attachment-list';

const { Item } = Descriptions;

const DeviceDesc: FC<{ data: Suspect }> = ({ data }) => {
	const {
		id,
		phone_name,
		owner_name,
		case_name,
		case_id,
		case_type,
		case_type_code,
		ab,
		ab_name,
		object_id,
		bm,
		identity_id_type_code,
		identity_id,
		hjdz,
		dz,
		gzdw,
		guojia_code,
		guojia,
		minzu,
		minzu_code,
		phone,
		desc,
		date,
		flag,
		officer_id,
		officer_name,
		dept,
		dept_name,
		str_phone_path,
		note
	} = data;

	const attach = useDeviceAttach(id);

	return (
		<>
			<Descriptions bordered={true} size="small">
				<Item label="手机名称">{phone_name}</Item>
				<Item label="持有人">{owner_name}</Item>
				<Item label="案件名称">{case_name ?? ''}</Item>
				<Item label="案件编号">{case_id ?? ''}</Item>
				<Item label="案件类型">{case_type ?? ''}</Item>
				<Item label="案件类型代码">{case_type_code ?? ''}</Item>
				<Item label="案别代码">{ab ?? ''}</Item>
				<Item label="案别名称">{ab_name ?? ''}</Item>
				<Item label="人员编号">{object_id ?? ''}</Item>
				<Item label="别名">{bm ?? ''}</Item>
				<Item label="证件类型">{identity_id_type_code ?? ''}</Item>
				<Item label="证件号码">{identity_id ?? ''}</Item>
				<Item label="户籍地址">{hjdz ?? ''}</Item>
				<Item label="现地址">{dz ?? ''}</Item>
				<Item label="工作单位">{gzdw ?? ''}</Item>
				<Item label="国家编码">{guojia_code ?? ''}</Item>
				<Item label="国家">{guojia ?? ''}</Item>
				<Item label="民族">{minzu ?? ''}</Item>
				<Item label="民族代码">{minzu_code ?? ''}</Item>
				<Item label="手机号码">{phone ?? ''}</Item>
				<Item label="描述">{desc ?? ''}</Item>
				<Item label="采集日期">{helper.isNullOrUndefined(date) ? '' : dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</Item>
				<Item label="采集类型">{flag ?? ''}</Item>
				<Item label="采集人员编号">{officer_id ?? ''}</Item>
				<Item label="采集人员姓名">{officer_name ?? ''}</Item>
				<Item label="采集人员单位代码">{dept ?? ''}</Item>
				<Item label="采集人员单位名称">{dept_name ?? ''}</Item>
				<Item label="手机绝对路径">{str_phone_path ?? ''}</Item>
				<Item label="备注">{note ?? ''}</Item>
			</Descriptions>
			<Divider orientation="left" plain={true}>
				附件
			</Divider>
			<AttachmentList data={attach} />
		</>
	);
};

export { DeviceDesc };

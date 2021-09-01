import dayjs from 'dayjs';
import React, { FC, useEffect, useRef, useState } from 'react';
import { routerRedux, useDispatch } from 'dva';
import { Link, useParams } from 'dva/router';
import zhCN from 'antd/es/date-picker/locale/zh_CN';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import Button from 'antd/lib/button';
import DatePicker from 'antd/lib/date-picker';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import { BorderBox, LabelBox, StrongBox } from '@/component/styled/container';
import { ListView } from '@/component/styled/widget';
import AttachmentModal from '@/component/attachment/attachment-modal';
import AttachmentUpload from '@/component/attachment/attachment-upload';
import { useDict } from '@/hook';
import { DictCategory } from '@/schema/dict';
import { LawCase } from '@/schema/law-case';
import { Suspect } from '@/schema/suspect';
import { Attachment } from '@/schema/attachment';
import { request } from '@/utility/request';
import { helper } from '@/utility/helper';
import { LawCase4Table } from '../../props';
import { SearchBox } from '../styled';

const { useForm, Item } = Form;
const { Option } = Select;
let minzuText = '未知';
let caseTypeText = '';
let guojiaText = '';
let identityIdTypeText = '';

/**
 * 添加设备
 */
const Add: FC<{}> = () => {
	const { id } = useParams<{ id: string }>(); //案件id
	const tempAttachList = useRef<Attachment[]>([]);
	const [lawCase, setLawCase] = useState<LawCase4Table>();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const [addFormRef] = useForm<Suspect>();
	const caseTypeData = useDict(DictCategory.CaseType);
	const certificateTypeData = useDict(DictCategory.CertificateType);
	const ethnicityData = useDict(DictCategory.Ethnicity);

	useEffect(() => {
		addFormRef.setFieldsValue({
			case_type_code: '',
			identity_id_type_code: '0',
			minzu_code: '00',
			flag: '',
			case_name: lawCase?.case_name ?? ''
		});
	}, [lawCase]);

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

	const onSubmit = async () => {
		setLoading(true);
		const nextId = helper.newId();
		const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
		try {
			const values = await addFormRef.validateFields();
			console.clear();
			console.log(values);
			console.log(tempAttachList.current);

			// await request({
			// 	url: '/case-attach/multi',
			// 	method: 'POST',
			// 	data: { form: tempAttachList.current }
			// });

			const { code, data } = await request<{ success: boolean }>({
				url: 'device',
				method: 'POST',
				data: {
					form: {
						...values,
						id: nextId,
						law_case_id: id,
						minzu: minzuText,
						identity_id_type: identityIdTypeText,
						case_type: caseTypeText,
						guojia: guojiaText,
						create_time: now,
						update_time: now
					},
					attachment: tempAttachList.current.map((item) => ({
						...item,
						suspect_id: nextId
					})) //附件
				}
			});

			if (code === 0 && data.success) {
				message.success('添加设备成功');
				dispatch(routerRedux.push('/default'));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/default">我的案件</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>添加设备</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>
			<BorderBox marginTop="10px" marginBottom="10px">
				<SearchBox>
					<div></div>
					<div>
						<Button disabled={loading} onClick={onSubmit} type="primary">
							{loading ? <LoadingOutlined /> : <SaveOutlined />}
							<span>保存</span>
						</Button>
					</div>
				</SearchBox>
			</BorderBox>
			<LabelBox marginTop="10px">
				<legend>附件</legend>
				<ListView marginBottom="10px">
					<li>
						{/* <Button>
							<UploadOutlined />
							<span>上传</span>
						</Button> */}
						<AttachmentUpload
							onChange={(info) => {
								const { response, status } = info.file;
								message.destroy();
								const hide = message.loading('正在上传，请不要离开此页面...');
								setLoading(true);
								switch (status) {
									case 'done':
										const { filename, hashname } = response;
										const next = new Attachment();
										next.id = helper.newId();
										next.file_name = filename;
										next.hash_name = hashname;
										next.create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
										next.update_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
										tempAttachList.current =
											tempAttachList.current.concat(next);
										// dispatch({
										// 	type: 'attachmentModal/add',
										// 	payload: { form: next }
										// });
										setLoading(false);
										hide();
										break;
									case 'error':
										message.error('上传失败');
										setLoading(false);
										break;
									case 'removed':
										setLoading(false);
										hide();
										break;
								}
							}}
							action="attachment/upload"
						/>
					</li>
				</ListView>
			</LabelBox>
			<BorderBox marginTop="10px">
				<AttachmentModal />
				<Form form={addFormRef} layout="vertical">
					<Item
						name="phone_name"
						label="手机名称"
						rules={[{ required: true, message: '请填写手机名称' }]}>
						<Input />
					</Item>
					<Item
						name="owner_name"
						label="持有人"
						rules={[{ required: true, message: '请填写持有人' }]}>
						<Input />
					</Item>
					<Item name="case_id" label="案件编号">
						<Input />
					</Item>
					<Item
						name="case_name"
						label="案件名称"
						rules={[{ required: true, message: '请填写案件名称' }]}>
						<Input />
					</Item>
					<Item name="case_type_code" label="案件类型">
						<Select onChange={(value, option: any) => (caseTypeText = option.children)}>
							{helper.bindOptions(caseTypeData, true, 'name', 'value')}
						</Select>
					</Item>
					<Item name="ab" label="案别代码">
						<Input />
					</Item>
					<Item name="ab_name" label="案别名称">
						<Input />
					</Item>
					<Item name="object_id" label="人员编号">
						<Input />
					</Item>
					<Item name="bm" label="别名">
						<Input />
					</Item>
					<Item name="identity_id_type_code" label="证件类型">
						<Select
							onChange={(value, option: any) =>
								(identityIdTypeText = option.children)
							}>
							{helper.bindOptions(certificateTypeData)}
						</Select>
					</Item>
					<Item name="identity_id" label="证件号码">
						<Input />
					</Item>
					<Item name="hjdz" label="户籍地址">
						<Input />
					</Item>
					<Item name="dz" label="现地址">
						<Input />
					</Item>
					<Item name="gzdw" label="工作单位">
						<Input />
					</Item>
					<Item name="guojia_code" label="国家编码">
						<Input />
					</Item>
					<Item name="guojia" label="国家">
						<Input />
					</Item>
					<Item name="minzu_code" label="民族">
						<Select onChange={(value, option: any) => (minzuText = option.children)}>
							{helper.bindOptions(ethnicityData)}
						</Select>
					</Item>
					<Item name="phone" label="手机号码">
						<Input />
					</Item>
					<Item name="desc" label="描述">
						<Input />
					</Item>
					<Item name="date" label="采集日期">
						<DatePicker locale={zhCN} />
					</Item>
					<Item name="flag" label="采集类型">
						<Select>
							<Option value="">---</Option>
							<Option value="01">嫌疑人</Option>
							<Option value="02">社会人员</Option>
						</Select>
					</Item>
					<Item name="officer_id" label="采集人员编号">
						<Input />
					</Item>
					<Item name="officer_name" label="采集人员姓名">
						<Input />
					</Item>
					<Item name="dept" label="采集人员单位代码">
						<Input />
					</Item>
					<Item name="dept_name" label="采集人员单位名称">
						<Input />
					</Item>
					<Item name="str_phone_path" label="手机绝对路径">
						<Input />
					</Item>
					<Item name="note" label="备注">
						<Input />
					</Item>
				</Form>
			</BorderBox>
		</>
	);
};

export default Add;

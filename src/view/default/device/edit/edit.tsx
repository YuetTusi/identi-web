import dayjs from 'dayjs';
import React, { FC, useEffect, useState, MouseEvent } from 'react';
import { useParams, routerRedux, useDispatch } from 'dva';
import { Link } from 'dva/router';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Button from 'antd/lib/button';
import DatePicker from 'antd/lib/date-picker';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import { useDict } from '@/hook';
import { request } from '@/utility/request';
import { helper } from '@/utility/helper';
import { Suspect } from '@/schema/suspect';
import { DictCategory } from '@/schema/dict';
import { BorderBox, LabelBox, StrongBox } from '@/component/styled/container';
import { ListView } from '@/component/styled/widget';
import AttachmentTable from '@/component/attachment/attachment-table';
import AttachmentUpload from '@/component/attachment/attachment-upload';
import { Attachment } from '@/schema/attachment';
import { SearchBox } from '../styled';

const { Item, useForm } = Form;
const { Option } = Select;

let minzuText = '';
let caseTypeText = '';
let identityIdTypeText = '';

/**
 * 编辑设备
 */
const Edit: FC<{}> = () => {
	const dispatch = useDispatch();
	const { did } = useParams<{ did: string; id: string }>();
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<Suspect | null>(null);
	const [attachment, setAttachment] = useState<Attachment[]>([]);
	const [editFormRef] = useForm<Suspect>();
	const caseTypeData = useDict(DictCategory.CaseType);
	const certificateTypeData = useDict(DictCategory.CertificateType);
	const ethnicityData = useDict(DictCategory.Ethnicity);

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const [attach, { code, data }] = await Promise.all([
					helper.getDeviceAttachment(did),
					request<Suspect | null>({
						url: `device/${did}`,
						method: 'GET'
					})
				]);
				setAttachment(attach);
				if (code === 0 && data !== null) {
					minzuText = data.minzu ?? '';
					caseTypeText = data.case_type ?? '';
					identityIdTypeText = data.identity_id_type ?? '';
					setData(data);
					editFormRef.setFieldsValue({
						...data,
						date: dayjs(
							helper.isNullOrUndefined(data.date) ? undefined : data.date
						) as any
					});
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		})();
	}, [did]);

	useEffect(() => {
		dispatch({ type: 'attachmentTable/setData', payload: attachment });
		return () => {
			dispatch({ type: 'attachmentTable/setData', payload: [] });
		};
	}, [attachment]);

	/**
	 * 查询设备附件
	 * @param id 设备id
	 */
	const fetchAttachment = async (id: string) => {
		const next = await helper.getDeviceAttachment(id);
		setAttachment(next);
	};

	/**
	 * 删除附件
	 * @param data 附件
	 */
	const onDel = async (attachment: Attachment) => {
		try {
			const { code, data, error } = await request<number>({
				url: 'case-attach',
				method: 'DELETE',
				data: { form: attachment }
			});
			if (code === 0 && data > 0) {
				message.success('附件删除成功');
				fetchAttachment(did);
			} else if (code === 1) {
				message.error('附件删除失败');
			} else {
				console.log('code:', code);
				console.log('data:', data);
				console.log('error:', error);
			}
		} catch (error) {
			message.error('附件删除失败');
		}
	};

	/**
	 * 保存Click
	 */
	const saveClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setLoading(true);
		try {
			const values = await editFormRef.validateFields();
			const { code, data } = await request<number>({
				url: `device/${did}`,
				method: 'PUT',
				data: {
					form: {
						...values,
						minzu: minzuText,
						case_type: caseTypeText,
						identity_id_type: identityIdTypeText
					}
				}
			});

			if (code === 0 && data > 0) {
				message.success('保存成功');
				dispatch(routerRedux.push('/default'));
			} else {
				message.error('保存失败');
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
					<BreadcrumbItem>{`编辑「${data?.phone_name ?? ''}」设备`}</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>
			<BorderBox marginTop="10px" marginBottom="10px">
				<SearchBox>
					<div></div>
					<div>
						<Button disabled={loading} onClick={saveClick} type="primary">
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
						<AttachmentUpload
							onChange={async (info) => {
								const { response, status } = info.file;
								switch (status) {
									case 'uploading':
										setLoading(true);
										break;
									case 'done':
										const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
										const { filename, hashname } = response;
										const next = new Attachment();
										next.id = helper.newId();
										next.suspect_id = did;
										next.file_name = filename;
										next.hash_name = hashname;
										next.create_time = now;
										next.update_time = now;
										const success = await helper.addAttachRec(next);
										if (success) {
											fetchAttachment(did);
											message.success('上传成功');
										}
										setLoading(false);
										break;
									case 'error':
										message.error('上传失败');
										setLoading(false);
										break;
									case 'removed':
										setLoading(false);
										break;
								}
							}}
							action="attachment/upload"
						/>
					</li>
					<li>
						<AttachmentTable onDel={onDel} />
					</li>
				</ListView>
			</LabelBox>
			<BorderBox marginTop="10px">
				<Form form={editFormRef} layout="vertical">
					<Row gutter={[20, 0]}>
						<Col span={6}>
							<Item
								name="phone_name"
								label="手机名称"
								rules={[{ required: true, message: '请填写手机名称' }]}>
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item
								name="owner_name"
								label="持有人"
								rules={[{ required: true, message: '请填写持有人' }]}>
								<Input />
							</Item>
						</Col>
						<Col span={12} />
					</Row>
					<Divider />
					<Row gutter={[20, 0]}>
						<Col span={6}>
							<Item
								name="case_name"
								label="案件名称"
								rules={[{ required: true, message: '请填写案件名称' }]}>
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="case_id" label="案件编号">
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="case_type_code" label="案件类型">
								<Select
									onChange={(value, option: any) =>
										(caseTypeText = option.children)
									}>
									{helper.bindOptions(caseTypeData, true, 'name', 'value')}
								</Select>
							</Item>
						</Col>
						<Col span={6}>
							<Item name="ab" label="案别代码">
								<Input />
							</Item>
						</Col>
					</Row>
					<Row gutter={[20, 0]}>
						<Col span={6}>
							<Item name="ab_name" label="案别名称">
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="object_id" label="人员编号">
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="bm" label="别名">
								<Input />
							</Item>
						</Col>
						<Col span={6} />
					</Row>
					<Row gutter={[20, 0]}>
						<Col span={6}>
							<Item name="identity_id_type_code" label="证件类型">
								<Select
									onChange={(value, option: any) =>
										(identityIdTypeText = option.children)
									}>
									{helper.bindOptions(certificateTypeData)}
								</Select>
							</Item>
						</Col>
						<Col span={6}>
							<Item name="identity_id" label="证件号码">
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="hjdz" label="户籍地址">
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="dz" label="现地址">
								<Input />
							</Item>
						</Col>
					</Row>
					<Row gutter={[20, 0]}>
						<Col span={6}>
							<Item name="gzdw" label="工作单位">
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="guojia_code" label="国家编码">
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="guojia" label="国家">
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="minzu_code" label="民族">
								<Select
									onChange={(value, option: any) =>
										(minzuText = option.children)
									}>
									{helper.bindOptions(ethnicityData)}
								</Select>
							</Item>
						</Col>
					</Row>
					<Row gutter={[20, 0]}>
						<Col span={6}>
							<Item name="phone" label="手机号码">
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="desc" label="描述">
								<Input />
							</Item>
						</Col>
						<Col span={12} />
					</Row>
					<Divider />
					<Row gutter={[20, 0]}>
						<Col span={6}>
							<Item name="date" label="采集日期">
								<DatePicker size="small" style={{ width: '100%' }} />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="flag" label="采集类型">
								<Select>
									<Option value="">---</Option>
									<Option value="01">嫌疑人</Option>
									<Option value="02">社会人员</Option>
								</Select>
							</Item>
						</Col>
						<Col span={6}>
							<Item name="officer_id" label="采集人员编号">
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="officer_name" label="采集人员姓名">
								<Input />
							</Item>
						</Col>
					</Row>
					<Row gutter={[20, 0]}>
						<Col span={6}>
							<Item name="dept" label="采集人员单位代码">
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="dept_name" label="采集人员单位名称">
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="str_phone_path" label="手机绝对路径">
								<Input />
							</Item>
						</Col>
						<Col span={6}>
							<Item name="note" label="备注">
								<Input />
							</Item>
						</Col>
					</Row>
				</Form>
			</BorderBox>
		</>
	);
};

export default Edit;

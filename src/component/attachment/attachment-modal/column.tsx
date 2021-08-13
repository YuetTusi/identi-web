import dayjs from 'dayjs';
import React from 'react';
import { Dispatch } from 'redux';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import Modal from 'antd/lib/modal';
import { ColumnsType } from 'antd/lib/table';
import webConfig from '@/config/web.json';
import { Attachment } from '@/schema/attachment';
import { NoWrapBox } from '../../styled/container';

const baseURL: string =
	process.env.NODE_ENV === 'development' ? webConfig.devBaseURL : webConfig.prodBaseURL;

/**
 * 表头定义
 * @param dispatch Dispatch
 */
const getColumns = (dispatch: Dispatch, ...handles: any[]) => {
	const [delHandle] = handles;

	const columns: ColumnsType<Attachment> = [
		{
			title: '附件',
			dataIndex: 'file_name',
			key: 'file_name',
			render(value: string) {
				return <NoWrapBox title={value} width="290px">{value}</NoWrapBox>;
			}
		},
		{
			title: '上传时间',
			dataIndex: 'create_time',
			key: 'create_time',
			align: 'center',
			width: '160px',
			render(value: string) {
				return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
			}
		},
		{
			title: '下载',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 60,
			render(value: string) {
				return (
					<a href={`${baseURL}attachment/download?id=${value}`} download={true}>
						<DownloadOutlined />
					</a>
				);
			}
		},
		{
			title: '删除',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 60,
			render(value: string, record: Attachment) {
				const { file_name } = record;
				return (
					<a
						onClick={() => {
							Modal.confirm({
								onOk() {
									delHandle(record);
								},
								title: '删除',
								content: `确认删除「${file_name}」？`,
								okText: '是',
								cancelText: '否'
							});
						}}>
						<DeleteOutlined />
					</a>
				);
			}
		}
	];
	return columns;
};

export { getColumns };

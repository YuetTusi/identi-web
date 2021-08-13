import dayjs from 'dayjs';
import React, { FC, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import Button from 'antd/lib/button';
import Upload from 'antd/lib/upload';
import Table from 'antd/lib/table';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import webConfig from '@/config/web.json';
import { helper } from '@/utility/helper';
import { Attachment } from '@/schema/attachment';
import { StateTree } from '@/schema/model-type';
import { AttachmentModalStoreState } from '@/model/component/attachment-modal';
import { ScrollBox, TableBox } from '../../styled/container';
import { getColumns } from './column';
import { AttachmentModalProp } from './props';
import { UploadPanel } from './styled-box';

const defaultPageSize = 5;

const baseURL: string =
	process.env.NODE_ENV === 'development' ? webConfig.devBaseURL : webConfig.prodBaseURL;

/**
 * 附件上传Modal
 */
const AttachmentModal: FC<AttachmentModalProp> = memo(() => {
	const dispatch = useDispatch();
	const [attachLoading, setAttachLoading] = useState(false);
	const { visible, caseId, data, loading, pageIndex, pageSize, total } = useSelector<
		StateTree,
		AttachmentModalStoreState
	>((state) => state.attachmentModal);
	useEffect(() => {
		if (visible && caseId !== '') {
			query(caseId, 1, defaultPageSize);
		}
	}, [visible, caseId]);

	/**
	 * 查询
	 * @param caseId 案件id
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 */
	const query = (caseId: string, pageIndex: number = 1, pageSize: number = defaultPageSize) => {
		dispatch({
			type: 'attachmentModal/query',
			payload: {
				pageIndex,
				pageSize,
				form: { id: caseId }
			}
		});
	};

	/**
	 * 删除附件
	 * @param data 附件数据
	 */
	const delHandle = (data: Attachment) =>
		dispatch({
			type: 'attachmentModal/del',
			payload: data
		});

	/**
	 * 取消Click
	 */
	const onCancel = () => {
		dispatch({ type: 'attachmentModal/setCaseId', payload: '' });
		dispatch({ type: 'attachmentModal/setVisible', payload: false });
	};

	/**
	 * 翻页Change
	 * @param pageIndex 当前页
	 */
	const onPageChange = (pageIndex: number) => {
		query(caseId, pageIndex, defaultPageSize);
	};

	return (
		<Modal
			footer={[
				<Button disabled={attachLoading} onClick={onCancel} key="B_0" type="default">
					{attachLoading ? <LoadingOutlined /> : <CloseCircleOutlined />}
					<span>取消</span>
				</Button>
			]}
			onCancel={onCancel}
			title="附件"
			width={650}
			visible={visible}
			maskClosable={false}
			closable={false}
			centered={true}
			destroyOnClose={true}>
			<ScrollBox>
				<UploadPanel>
					<Upload
						onChange={(info) => {
							const { response } = info.file;
							if (info.file.status === 'done') {
								const { filename, hashname } = response;
								const next = new Attachment();
								next.id = helper.newId();
								next.case_id = caseId;
								next.file_name = filename;
								next.hash_name = hashname;
								next.create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
								next.update_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
								dispatch({ type: 'attachmentModal/add', payload: { form: next } });
								setAttachLoading(false);
							}
							if (info.file.status === 'error') {
								message.error('上传失败');
								setAttachLoading(false);
							}
						}}
						multiple={false}
						action={`${baseURL}attachment/upload`}
						beforeUpload={(file) => {
							setAttachLoading(true);
							Promise.resolve(file);
						}}>
						<Button type="primary">
							<UploadOutlined />
							<span>上传</span>
						</Button>
					</Upload>
				</UploadPanel>
			</ScrollBox>
			<TableBox marginTop="5px">
				<Table<Attachment>
					pagination={{
						onChange: onPageChange,
						pageSize: pageSize,
						current: pageIndex,
						total: total
					}}
					dataSource={data}
					loading={loading}
					columns={getColumns(dispatch, delHandle)}
					rowKey="id"
					bordered={false}
				/>
			</TableBox>
		</Modal>
	);
});

AttachmentModal.defaultProps = {};

export default AttachmentModal;

import React, { FC, memo } from 'react';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import Empty from 'antd/lib/empty';
import Modal from 'antd/lib/modal';
import webConfig from '@/config/web.json';
import { Attachment } from '@/schema/attachment';
import { AttachList } from '@/component/styled/widget';

const baseURL: string =
	process.env.NODE_ENV === 'development' ? webConfig.devBaseURL : webConfig.prodBaseURL;

const List: FC<{ data: Attachment[] }> = ({ data }) => (
	<>
		{data.map(({ id, file_name }) => (
			<li key={id}>
				<a href={`${baseURL}attachment/download?id=${id}`} download={true} target="_blank">
					<label>{file_name}</label>
				</a>
				<a href={`${baseURL}attachment/download?id=${id}`} download={true} target="_blank">
					<i title="下载附件">
						<DownloadOutlined />
					</i>
				</a>
				<a
					onClick={() =>
						Modal.confirm({
							onOk() {
								console.log(id);
							},
							okText: '是',
							cancelText: '否',
							title: '删除附件',
							content: `确认删除「${file_name}」？`
						})
					}>
					<i title="删除附件">
						<DeleteOutlined />
					</i>
				</a>
			</li>
		))}
	</>
);

/**
 * 附件列表
 */
const AttachmentList: FC<{ data: Attachment[]; canDel?: boolean }> = memo(({ data }) => {
	return (
		<AttachList>
			{data.length === 0 ? (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无附件" />
			) : (
				<List data={data} />
			)}
		</AttachList>
	);
});

AttachmentList.defaultProps = {
	data: [],
	canDel: false
};

export { AttachmentList, List };

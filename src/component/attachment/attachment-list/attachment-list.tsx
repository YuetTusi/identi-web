import React, { FC, memo } from 'react';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import Empty from 'antd/lib/empty';
import webConfig from '@/config/web.json';
import { useAttachList } from '@/hook';
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
					<i>
						<DownloadOutlined />
					</i>
				</a>
			</li>
		))}
	</>
);

/**
 * 附件列表
 */
const AttachmentList: FC<{ caseId: string }> = memo(({ caseId }) => {
	const list = useAttachList(caseId);

	return (
		<AttachList>
			{list.length === 0 ? (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无附件" />
			) : (
				<List data={list} />
			)}
		</AttachList>
	);
});

export { AttachmentList, List };

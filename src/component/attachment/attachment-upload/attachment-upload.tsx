import React, { FC } from 'react';
import Button from 'antd/lib/button';
import Upload from 'antd/lib/upload';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import webConfig from '@/config/web.json';
import { AttachmentUploadProp } from './props';

const { devBaseURL, prodBaseURL } = webConfig;
const baseURL: string = process.env.NODE_ENV === 'development' ? devBaseURL : prodBaseURL;

/**
 * 上传
 */
const AttachmentUpload: FC<AttachmentUploadProp> = ({ action, multiple, onChange, onRemove }) => (
	<Upload
		onChange={onChange}
		onRemove={onRemove}
		action={baseURL + action}
		headers={{ Authorization: sessionStorage.getItem('user_token')! }}
		maxCount={5}
		multiple={multiple}>
		<Button type="primary">
			<UploadOutlined />
			<span>上传</span>
		</Button>
	</Upload>
);

AttachmentUpload.defaultProps = {
	multiple: false,
	onChange: () => {},
	onRemove: () => {}
};

export default AttachmentUpload;

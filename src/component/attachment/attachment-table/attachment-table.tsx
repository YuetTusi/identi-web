import React, { FC } from 'react';
import Empty from 'antd/lib/empty';
import Table from 'antd/lib/table';
import { Attachment } from '@/schema/attachment';
import { useDispatch, useSelector } from 'dva';
import { StateTree } from '@/schema/model-type';
import { AttachmentTableStoreState } from '@/model/component/attachment-table';
import { getColumns } from './column';
import { AttachmentTableProp } from './props';

/**
 * 附件表
 */
const AttachmentTable: FC<AttachmentTableProp> = ({ onDel }) => {
	const dispatch = useDispatch();
	const { data, loading } = useSelector<StateTree, AttachmentTableStoreState>(
		(state) => state.attachmentTable
	);

	return (
		<Table<Attachment>
			dataSource={data}
			loading={loading}
			columns={getColumns(dispatch, onDel)}
			locale={{
				emptyText: <Empty description="暂无附件" image={Empty.PRESENTED_IMAGE_SIMPLE} />
			}}
			pagination={false}
			rowKey="id"
			bordered={false}
		/>
	);
};

export default AttachmentTable;

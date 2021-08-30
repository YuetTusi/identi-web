import React, { FC, useEffect, useState } from 'react';
import message from 'antd/lib/message';
import Table from 'antd/lib/table';
import { getColumns } from './column';
import { ListProp, Page } from './props';
import { InnerTableBox } from './styled';
import { Suspect } from '@/schema/suspect';
import { request, RequestResult } from '@/utility/request';

const defaultPageSize = 10;

/**
 * 设备表格
 */
const List: FC<ListProp> = ({ visible, lawCase }) => {

	const [loading, setLoading] = useState<boolean>(false);
	const [page, setPage] = useState<Page>({ pageIndex: 1, pageSize: defaultPageSize, total: 0 });
	const [data, setData] = useState<Suspect[]>([]);

	useEffect(() => {
		if (visible) {
			queryByPage(1, defaultPageSize, { law_case_id: lawCase.id });
		} else {
			setData([]);
			setPage({
				pageIndex: 1,
				pageSize: defaultPageSize,
				total: 0
			});
		}
	}, [visible, lawCase]);

	/**
	 * 查询
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 * @param condition 条件
	 */
	const queryByPage = async (pageIndex: number, pageSize: number, condition: any) => {
		setLoading(true);
		try {
			const { code, data }: RequestResult<{ data: Suspect[]; total: number }> = await request(
				{
					url: 'device/list',
					method: 'POST',
					data: { form: { pageIndex, pageSize, condition } }
				}
			);
			if (code === 0) {
				setData(data.data);
				setPage({
					pageIndex,
					pageSize,
					total: data.total
				});
			} else {
				setData([]);
				setPage({
					pageIndex,
					pageSize,
					total: data.total
				});
				message.error('设备查询失败');
			}
		} catch (error) {
			message.error('设备查询失败');
		} finally {
			setLoading(false);
		}
	};

	/**
	 * 翻页Change
	 * @param pageIndex 当前页
	 */
	const onPageChange = (pageIndex: number) => {
		queryByPage(pageIndex, defaultPageSize, { law_case_id: lawCase.id });
	};

	return (
		<InnerTableBox>
			<Table
				pagination={{
					onChange: onPageChange,
					current: page.pageIndex,
					pageSize: page.pageSize,
					total: page.total
				}}
				columns={getColumns(queryByPage)}
				dataSource={data}
				rowKey={(row) => row.id}
				loading={loading}
			/>
		</InnerTableBox>
	);
};

List.defaultProps = {
	visible: false
};

export default List;

import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import Button from 'antd/lib/button';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import Form from 'antd/lib/form';
import Table from 'antd/lib/table';
import Modal from 'antd/lib/modal';
import { helper } from '@/utility/helper';
import { StateTree } from '@/schema/model-type';
import { MessageStoreState } from '@/model/message';
import { ActionMessageListStoreState } from '@/model/component/action-message-list';
import { BorderBox, StrongBox, TableBox } from '@/component/styled/container';
import { TablePanel } from '@/component/styled/widget';
import SearchForm from './search-form';
import { SearchBox } from './styled';
import { getColumns } from './columns';
import { MessageProp, FormValue } from './props';

const { useForm } = Form;
const defaultPageSize = 10;
const uid = helper.getUId();

const Message: FC<MessageProp> = () => {
	const dispatch = useDispatch();
	const [searchFormRef] = useForm();
	const { messageModel, actionMessageListModel } = useSelector<
		StateTree,
		{
			messageModel: MessageStoreState;
			actionMessageListModel: ActionMessageListStoreState;
		}
	>((state) => {
		return {
			messageModel: state.message,
			actionMessageListModel: state.actionMessageList
		};
	});

	useEffect(() => {
		const values = searchFormRef.getFieldsValue();
		query({ ...values, user_id: uid }, 1);
	}, []);

	/**
	 *
	 * @param condition 条件
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 */
	const query = (condition: Record<string, any>, pageIndex: number, pageSize = defaultPageSize) =>
		dispatch({
			type: 'message/queryByPage',
			payload: {
				condition,
				pageIndex,
				pageSize
			}
		});

	/**
	 * 查询Submit
	 * @param values 表单数据
	 */
	const onSearchFormSubmit = (values: FormValue) => query({ ...values, user_id: uid }, 1);

	/**
	 * 全部已读Click
	 */
	const readAllClick = () =>
		Modal.confirm({
			onOk() {
				dispatch({ type: 'actionMessageList/updateAllReadState', payload: uid });
			},
			title: '确认读取',
			content: '确认读取全部消息？',
			centered: true,
			okText: '是',
			cancelText: '否'
		});

	/**
	 * 翻页Change
	 * @param pageIndex 当前页
	 */
	const onPageChange = (pageIndex: number) => {
		const values = searchFormRef.getFieldsValue();
		query({ ...values, user_id: uid }, pageIndex);
	};

	return (
		<TablePanel>
			<StrongBox>
				<Breadcrumb>
					<BreadcrumbItem>我的消息</BreadcrumbItem>
				</Breadcrumb>
			</StrongBox>

			<BorderBox marginTop="10px" marginBottom="10px">
				<SearchBox>
					<SearchForm formRef={searchFormRef} onSearchFormSubmit={onSearchFormSubmit} />
					<div>
						<Button
							disabled={actionMessageListModel.loading}
							onClick={readAllClick}
							type="primary">
							{actionMessageListModel.loading ? (
								<LoadingOutlined />
							) : (
								<CheckCircleOutlined />
							)}
							<span>全部已读</span>
						</Button>
					</div>
				</SearchBox>
			</BorderBox>
			<TableBox>
				<Table
					pagination={{
						onChange: onPageChange,
						current: messageModel.pageIndex,
						pageSize: messageModel.pageSize,
						total: messageModel.total
					}}
					columns={getColumns(dispatch)}
					dataSource={messageModel.data}
					loading={messageModel.loading}
					rowClassName="az-table-row"
					rowKey="id"
					bordered={false}
				/>
			</TableBox>
		</TablePanel>
	);
};

export default Message;

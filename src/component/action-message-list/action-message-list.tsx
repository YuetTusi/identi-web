import dayjs from 'dayjs';
import React, { FC } from 'react';
import { useSelector } from 'dva';
import Button from 'antd/lib/button';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import Empty from 'antd/lib/empty';
import { helper } from '@/utility/helper';
import { StateTree } from '@/schema/model-type';
import { ActionMessageListStoreState } from '@/model/component/action-message-list';
import { MessageListRoot } from './styled';
import { ActionMessageListProp } from './props';

const { Group } = Button;
const uid = helper.getUId();

/**
 * 用户消息列表
 */
const ActionMessageList: FC<ActionMessageListProp> = ({ onMessageClick, onReadAllClick }) => {
	const { data } = useSelector<StateTree, ActionMessageListStoreState>(
		(state) => state.actionMessageList
	);

	return (
		<MessageListRoot>
			{data.length === 0 ? (
				<div className="empty-panel">
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无消息" />
				</div>
			) : (
				<>
					<div className="list-panel">
						<ul>
							{data.map((item) => (
								<li onClick={() => onMessageClick(item)} key={item.id}>
									<a>{item.content}</a>
									<span>
										<time>
											{dayjs(item.update_time).format('YYYY-MM-DD HH:mm:ss')}
										</time>
										<em>
											<CheckCircleFilled />
											<span>已读</span>
										</em>
									</span>
								</li>
							))}
						</ul>
					</div>
					<div className="button-panel">
						<Group>
							<Button onClick={() => onReadAllClick(uid!)}>全部已读</Button>
							<Button>查看全部</Button>
						</Group>
					</div>
				</>
			)}
		</MessageListRoot>
	);
};

ActionMessageList.defaultProps = {
	onMessageClick: () => {}
};

export default ActionMessageList;

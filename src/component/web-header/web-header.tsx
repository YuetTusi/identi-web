import debounce from 'lodash/debounce';
import React, { FC, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { routerRedux } from 'dva/router';
import Badge from 'antd/lib/badge';
import Button from 'antd/lib/button';
import Popover from 'antd/lib/popover';
import Modal from 'antd/lib/modal';
import UserOutlined from '@ant-design/icons/UserOutlined';
import MailOutlined from '@ant-design/icons/lib/icons/MailOutlined';
import { helper } from '@/utility/helper';
import { SessionStorageKeys } from '@/utility/helper';
import { StateTree } from '@/schema/model-type';
import { ActionMessage, ActionMessageState } from '@/schema/action-message';
import Authority from '@/component/authority';
import { ActionMessageListStoreState } from '@/model/component/action-message-list';
import { StrongBox } from '../styled/container';
import { WebHeaderRoot } from './styled/layout-box';
import ActionMessageList from '../action-message-list';
import { WebHeaderProp } from './props';

/**
 * 站点头部
 */
const WebHeader: FC<WebHeaderProp> = () => {
	const dispatch = useDispatch();
	const { data } = useSelector<StateTree, ActionMessageListStoreState>(
		(state) => state.actionMessageList
	);

	useEffect(() => {
		const userId = helper.getUId();
		if (userId !== null) {
			queryMessage(userId, ActionMessageState.Unread);
		}
	}, []);

	/**
	 * 查询消息
	 * @param userId 用户id
	 * @param state 状态
	 */
	const queryMessage = (userId: string, state: ActionMessageState) => {
		dispatch({
			type: 'actionMessageList/queryMessage',
			payload: { userId, state }
		});
	};

	/**
	 * 登出Click
	 */
	const onLogoutClick = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		sessionStorage.clear();
		dispatch(routerRedux.push('/login'));
	};

	/**
	 * 更新消息为已读
	 */
	const onMessageClick = debounce(
		({ id }: ActionMessage) => {
			const userId = helper.getUId();
			dispatch({
				type: 'actionMessageList/updateReadState',
				payload: id
			});
			queryMessage(userId!, ActionMessageState.Unread);
		},
		1000,
		{ leading: true, trailing: false }
	);

	/**
	 * 更新全部消息已读
	 */
	const onReadAllClick = debounce(
		(userId: string) => {
			Modal.confirm({
				onOk() {
					dispatch({
						type: 'actionMessageList/updateAllReadState',
						payload: userId
					});
					dispatch({
						type: 'actionMessageList/queryMessage',
						payload: { userId, state: ActionMessageState.Unread }
					});
				},
				title: '确认读取',
				content: '确认读取全部消息？',
				centered: true,
				okText: '是',
				cancelText: '否'
			});
		},
		1000,
		{ leading: true, trailing: false }
	);

	/**
	 * 去消息列表页
	 */
	const onDisplayClick = () => dispatch(routerRedux.push('/message'));

	return (
		<WebHeaderRoot>
			<div className="first-row">
				<div className="caption">案件鉴定管理</div>
				<div className="fn">
					<StrongBox>
						<a onClick={onLogoutClick}>退出系统</a>
					</StrongBox>
				</div>
			</div>
			<div className="second-row">
				<div className="left"></div>
				<div className="right">
					<div className="btn">
						{data.length === 0 ? (
							<Button icon={<MailOutlined />} type="default" shape="circle" />
						) : (
							<Popover
								content={
									<ActionMessageList
										onMessageClick={onMessageClick}
										onReadAllClick={onReadAllClick}
										onDisplayClick={onDisplayClick}
									/>
								}
								trigger="hover"
								placement="bottomRight"
								overlayClassName="over-right-popover-padding">
								<Badge count={data.length}>
									<Button type="default" shape="circle" icon={<MailOutlined />} />
								</Badge>
							</Popover>
						)}
					</div>
					<Authority k="/profile">
						<div
							className="user"
							onClick={() => dispatch(routerRedux.push('/profile/setting'))}>
							<i>
								<UserOutlined />
							</i>
							<div>
								<span>
									{sessionStorage.getItem(SessionStorageKeys.UserName) ?? ''}
								</span>
							</div>
						</div>
					</Authority>
				</div>
			</div>
		</WebHeaderRoot>
	);
};

export default WebHeader;

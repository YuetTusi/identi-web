import React, { FC, memo } from 'react';
import { LabelBox } from '@/component/styled/container';
import { User } from '@/schema/user';
import { ListView } from '@/component/styled/widget';

/**
 * 用户信息组件
 */
const UserInfo: FC<User> = (props) => (
	<LabelBox>
		<legend>用户信息</legend>
		<ListView>
			<li>
				<label>用户名：</label>
				<span>{props.username}</span>
			</li>
			<li>
				<label>邮箱：</label>
				<span>{props.mail ?? ''}</span>
			</li>
			<li>
				<label>手机/电话：</label>
				<span>{props.mobile ?? ''}</span>
			</li>
			<li>
				<label>真实姓名：</label>
				<span>{props.realname ?? ''}</span>
			</li>
			<li>
				<label>描述：</label>
				<span>{props.desc ?? ''}</span>
			</li>
		</ListView>
	</LabelBox>
);

export default memo(UserInfo);

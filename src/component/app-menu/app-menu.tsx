import React, { FC } from 'react';
import { useLocation, useSelector } from 'dva';
import { Link, withRouter } from 'dva/router';
import Menu from 'antd/lib/menu';
import { StateTree } from '@/schema/model-type';
import { AppMenuStoreState, ResourceItem } from '@/model/app-menu';
import BorderOutlined from '@ant-design/icons/BorderOutlined';
import TableOutlined from '@ant-design/icons/TableOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import SolutionOutlined from '@ant-design/icons/SolutionOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import PartitionOutlined from '@ant-design/icons/PartitionOutlined';
import IdcardOutlined from '@ant-design/icons/IdcardOutlined';
import ToolOutlined from '@ant-design/icons/ToolOutlined';

const { SubMenu, Item } = Menu;

interface AppMenuProp {}

/**
 * 菜单项Icon
 * @param url 路径
 */
const getIcon = (url: string): JSX.Element => {
	switch (url) {
		case '/':
			return <BookOutlined />;
		case '/default':
			return <SolutionOutlined />;
		case '/permission':
			return <SettingOutlined />;
		case '/permission/law-case':
			return <TableOutlined />;
		case '/permission/user':
			return <UserOutlined />;
		case '/permission/role':
			return <TeamOutlined />;
		case '/permission/resource':
			return <PartitionOutlined />;
		case '/profile':
			return <IdcardOutlined />;
		case '/profile/setting':
			return <ToolOutlined />;
		default:
			return <BorderOutlined />;
	}
};

/**
 * 主菜单
 */
const AppMenu: FC<AppMenuProp> = () => {
	const { pathname } = useLocation();
	const { data } = useSelector<StateTree, AppMenuStoreState>((state) => state.appMenu);

	const renderMenu = () =>
		data.map(({ name, key, children }) => (
			<SubMenu icon={getIcon(key)} title={name} key={key}>
				{renderChildren(children)}
			</SubMenu>
		));

	const renderChildren = (data: ResourceItem[]) =>
		data === null || data === undefined
			? null
			: data.map(({ name, key }) => (
					<Item icon={getIcon(key)} key={key}>
						<Link to={key} replace={true}>
							{name}
						</Link>
					</Item>
			  ));

	return (
		<div>
			<Menu
				selectedKeys={[pathname]}
				defaultOpenKeys={['/', '/permission', '/profile']}
				style={{ width: '200px' }}
				mode="inline">
				{renderMenu()}
			</Menu>
		</div>
	);
};

export default withRouter(AppMenu);

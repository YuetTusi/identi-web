import React, { FC } from 'react';
import { useLocation, useSelector } from 'dva';
import { Link, withRouter } from 'dva/router';
import Menu from 'antd/lib/menu';
import { StateTree } from '@/schema/model-type';
import { AppMenuStoreState, ResourceItem } from '@/model/app-menu';
import BorderOutlined from '@ant-design/icons/BorderOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import IdcardOutlined from '@ant-design/icons/IdcardOutlined';

const { SubMenu, Item } = Menu;
const defaultOpenTabs = ['/', '/permission', '/profile'];

interface AppMenuProp {}

/**
 * 菜单项Icon
 * @param url 路径
 */
const getIcon = (url: string): JSX.Element | null => {
	switch (url) {
		case '/':
			return <BookOutlined />;
		case '/permission':
			return <SettingOutlined />;
		case '/profile':
			return <IdcardOutlined />;
		case '/default':
		case '/message':
		case '/permission/law-case':
		case '/permission/user':
		case '/permission/role':
		case '/permission/resource':
		case '/permission/dict':
		case '/profile/setting':
			return null;
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
				defaultOpenKeys={defaultOpenTabs}
				style={{ width: '180px' }}
				mode="inline">
				{renderMenu()}
			</Menu>
		</div>
	);
};

export default withRouter(AppMenu);

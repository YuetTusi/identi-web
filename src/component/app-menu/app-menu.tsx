import React, { FC } from 'react';
import { connect } from 'dva';
import { Link, withRouter } from 'dva/router';
import Menu from 'antd/lib/menu';
import BorderOutlined from '@ant-design/icons/BorderOutlined';
import TableOutlined from '@ant-design/icons/TableOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import SolutionOutlined from '@ant-design/icons/SolutionOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import PartitionOutlined from '@ant-design/icons/PartitionOutlined';
import { StoreComponent } from '@/schema/model-type';
import { AppMenuStoreState, ResourceItem } from '@/model/app-menu';

const { SubMenu, Item } = Menu;

interface AppMenuProp extends Partial<StoreComponent> {
	appMenu: AppMenuStoreState;
}

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
		default:
			return <BorderOutlined />;
	}
};

/**
 * 主菜单
 */
const AppMenu: FC<AppMenuProp> = (props) => {
	const { pathname } = props.location!;
	const { data } = props.appMenu;

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
				defaultOpenKeys={['/', '/permission']}
				style={{ width: '200px' }}
				mode="inline">
				{renderMenu()}
			</Menu>
		</div>
	);
};

export default withRouter(connect((state: any) => ({ appMenu: state.appMenu }))(AppMenu));

import React, { FC } from 'react';
import { connect } from 'dva';
import { Link, withRouter } from 'dva/router';
import Menu from 'antd/lib/menu';
import { StoreComponent } from '@/schema/model-type';
import { AppMenuStoreState, ResourceItem } from '@/model/app-menu';

const { SubMenu, Item } = Menu;

interface AppMenuProp extends Partial<StoreComponent> {
	appMenu: AppMenuStoreState;
}

/**
 * 主菜单
 */
const AppMenu: FC<AppMenuProp> = (props) => {
	const { pathname } = props.location!;
	const { data } = props.appMenu;

	const renderMenu = () =>
		data.map((i) => (
			<SubMenu title={i.name} key={i.key}>
				{renderChildren(i.children)}
			</SubMenu>
		));

	const renderChildren = (data: ResourceItem[]) =>
		data.map((i) => (
			<Item key={i.key}>
				<Link to={i.key} replace={true}>
					{i.name}
				</Link>
			</Item>
		));

	return (
		<div>
			<Menu
				selectedKeys={[pathname]}
				defaultOpenKeys={['/permission']}
				style={{ width: '200px' }}
				mode="inline">
				{renderMenu()}
			</Menu>
		</div>
	);
};

export default withRouter(connect((state: any) => ({ appMenu: state.appMenu }))(AppMenu));

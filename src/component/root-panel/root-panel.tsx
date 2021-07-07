import { NotLogin } from '@/view/warn';
import React, { FC } from 'react';
import AppMenu from '../app-menu';
import { RootPanelProp } from './props';

/**
 * 视图根组件
 * 用于验证登录，若用户token不存在则提示
 * @returns
 */
const RootPanel: FC<RootPanelProp> = (props) => {
	// const [isLogin, setIsLogin] = useState<boolean>(false);

	// useEffect(() => {
	// 	let token = sessionStorage.getItem('user_token');
	// 	setIsLogin(token !== null);
	// }, []);

	return (
		<div>
			{sessionStorage.getItem('user_token') === null ? (
				<NotLogin />
			) : (
				<>
					<AppMenu/>
					{props.children}
				</>
			)}
		</div>
	);
};

export default RootPanel;

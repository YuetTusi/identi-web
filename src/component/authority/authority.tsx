import React, { FC, useEffect, useState } from 'react';
import { helper } from '@/utility/helper';
import { AuthorityProp } from './props';
import { useSelector } from 'dva';
import { AppMenuStoreState } from '@/model/app-menu';

/**
 * 权限控制
 * @param props
 * @returns
 */
const Authority: FC<AuthorityProp> = (props) => {
	const { k, children } = props;
	const { data } = useSelector<any, AppMenuStoreState>((state: any) => state.appMenu);
	const [visible, setVisible] = useState<boolean>(false);

	useEffect(() => setVisible(helper.hasRoute(data, k)), [k, data]);

	return <div style={{ display: visible ? 'block' : 'none' }}>{children}</div>;
};

export default Authority;

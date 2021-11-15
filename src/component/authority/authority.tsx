import React, { FC, useEffect, useState } from 'react';
import { helper } from '@/utility/helper';
import { AuthorityProp } from './props';
import { useSelector } from 'dva';
import { AppMenuStoreState } from '@/model/app-menu';
import { StateTree } from '@/schema/model-type';

/**
 * 权限控制
 */
const Authority: FC<AuthorityProp> = ({ k, children }) => {
	const { data } = useSelector<StateTree, AppMenuStoreState>((state) => state.appMenu);
	const [visible, setVisible] = useState<boolean>(false);

	useEffect(() => setVisible(helper.hasRoute(data, k)), [data, k]);

	return <div style={{ display: visible ? 'block' : 'none' }}>{children}</div>;
};

export default Authority;

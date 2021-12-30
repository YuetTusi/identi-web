import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'dva';
import { helper } from '@/utility/helper';
import { AppMenuStoreState } from '@/model/app-menu';
import { StateTree } from '@/schema/model-type';
import { AuthorityProp } from './props';

/**
 * 权限控制
 */
const Authority: FC<AuthorityProp> = ({ k, children }) => {
	const { data } = useSelector<StateTree, AppMenuStoreState>((state) => state.appMenu);
	const [visible, setVisible] = useState<boolean>(false);

	useEffect(() => setVisible(helper.hasRoute(data, k)), [data, k]);

	return visible ? <div>{children}</div> : null;
};

export default Authority;

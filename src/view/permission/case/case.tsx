import React, { FC, useEffect } from 'react';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
import { helper } from '@/utility/helper';
import { DictCategory } from '@/schema/dict';

const Case: FC<{}> = () => {
	useEffect(() => {
		helper.getDict(DictCategory.CaseType).then((res) => console.log(res));
	}, []);

	return (
		<>
			<Breadcrumb>
				<BreadcrumbItem>案件管理</BreadcrumbItem>
			</Breadcrumb>
		</>
	);
};

export default Case;

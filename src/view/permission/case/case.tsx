import React, { FC } from 'react';
import Breadcrumb from 'antd/lib/breadcrumb';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';

const Case: FC<{}> = () => {
	return (
		<div>
			<Breadcrumb>
				<BreadcrumbItem>案件管理</BreadcrumbItem>
			</Breadcrumb>
		</div>
	);
};

export default Case;

import React, { FC, useEffect, useState } from 'react';
import Empty from 'antd/lib/empty';
import Collapse from 'antd/lib/collapse';
import { request } from '@/utility/request';
import { helper } from '@/utility/helper';
import { DeviceDesc } from './device-desc';
import { DeviceFoldProp } from './props';
import { Suspect } from '@/schema/suspect';

const { Panel } = Collapse;

const DeviceFold: FC<DeviceFoldProp> = ({ caseId }) => {
	const [devices, setDevices] = useState<Suspect[]>([]);

	useEffect(() => {
		if (caseId !== null) {
			(async () => {
				const { code, data } = await request<Suspect[]>({
					url: `device/law-case/${caseId}`,
					method: 'GET'
				});
				if (code === 0) {
					setDevices(data);
					console.log(data);
				}
			})();
		}
	}, [caseId]);

	const renderDesc = (list: Suspect[]) =>
		list.length === 0 ? (
			<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无设备" />
		) : (
			<Collapse>
				{list.map((item) => (
					<Panel key={item.id} header={item.phone_name}>
						<DeviceDesc data={item} key={item.id} />
					</Panel>
				))}
			</Collapse>
		);

	return <div>{renderDesc(devices)}</div>;
};

DeviceFold.defaultProps = {
	caseId: null
};

export default DeviceFold;

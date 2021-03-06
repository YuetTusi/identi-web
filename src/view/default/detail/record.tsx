import React, { FC } from 'react';
import dayjs from 'dayjs';
import { CaseRec } from '@/schema/case-rec';
import { CaseState } from '@/schema/law-case';
import { ListView } from '@/component/styled/widget';

interface RecordProp {
	/**
	 * 鉴定记录数据
	 */
	data: CaseRec;
	/**
	 * 案件状态
	 */
	state: CaseState;
}

/**
 * 最后一条鉴定记录
 */
const Record: FC<RecordProp> = (props) => {
	const { data, state } = props;

	if (state === CaseState.Finish) {
		return (
			<ListView>
				<li>
					<label>鉴定时间：</label>
					<span>{dayjs(data?.rec_time).format('YYYY-MM-DD')}</span>
				</li>
				<li>
					<label>鉴定地点：</label>
					<span>{data?.rec_place ?? ''}</span>
				</li>
				<li>
					<label>鉴定意见：</label>
					<span>{data?.suggest}</span>
				</li>
			</ListView>
		);
	} else {
		return <ListView>
			<li>
				<label>处理时间：</label>
				<span>{dayjs(data?.action_time).format('YYYY-MM-DD HH:mm:ss')}</span>
			</li>
			<li>
				<label>说明：</label>
				<span>{data?.action_note ?? ''}</span>
			</li>
		</ListView>;
	}
};

export default Record;

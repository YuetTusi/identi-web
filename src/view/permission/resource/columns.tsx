import { Dispatch } from 'dva';

const getColumns = (dispatch: Dispatch) => {
	const columns = [
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '键值（路径）',
			dataIndex: 'key',
			key: 'key'
		},
		{
			title: '类型',
			dataIndex: 'type',
			key: 'type'
		},
		{
			title: '层级',
			dataIndex: 'level',
			key: 'level',
			width: 50
		},
		{
			title: '顺序',
			dataIndex: 'seq',
			key: 'seq',
			width: 50
		},
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
            width: 280
		},
		{
			title: '父级id',
			dataIndex: 'pid',
			key: 'pid',
            width: 280
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
			key: 'create_time'
		},
		{
			title: '更新时间',
			dataIndex: 'update_time',
			key: 'update_time'
		}
	];
	return columns;
};

export { getColumns };

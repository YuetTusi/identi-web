import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';
import { Suspect } from '@/schema/suspect';

const defaultPageSize = 10;

interface DeviceStoreState {
    /**
     * 数据
     */
    data: Suspect[],
    /**
     * 当前页
     */
    pageIndex: number,
    /**
     * 页尺寸
     */
    pageSize: number,
    /**
     * 总数
     */
    total: number,
    /**
     * 加载中
     */
    loading: boolean
}

let model: Model = {
    namespace: 'device',
    state: {
        data: [],
        pageIndex: 1,
        pageSize: defaultPageSize,
        total: 0,
        loading: false
    },
    reducers,
    effects
};

export { DeviceStoreState };
export default model;
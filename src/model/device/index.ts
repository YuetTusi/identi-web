import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';
import { Suspect } from '@/schema/suspect';

interface DeviceStoreState {
    /**
     * 数据
     */
    data: Suspect[],
    /**
     * 加载中
     */
    loading: boolean
}

let model: Model = {
    namespace: 'device',
    state: {
        data: [],
        loading: false
    },
    reducers,
    effects
};

export { DeviceStoreState };
export default model;
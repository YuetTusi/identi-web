import { Model } from 'dva';
import { Resource } from '@/schema/resource';
import reducers from './reducers';
import effects from './effects';

/**
 * 资源StoreState
 */
interface ResourceStoreState {
    /**
     * 资源表数据
     */
    data: Resource[]
}


let model: Model = {
    namespace: 'resource',
    state: {
        data: []
    },
    reducers,
    effects
}

export { ResourceStoreState };
export default model;
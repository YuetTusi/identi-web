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
    data: Resource[],
    /**
     * 当前页
     */
    pageIndex: number,
    /**
     * 页尺寸
     */
    pageSize: number,
    /**
     * 记录总数
     */
    total: number,
    /**
     * 读取状态
     */
    loading: boolean
}


let model: Model = {
    namespace: 'resource',
    state: {
        data: [],
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        loading: false
    },
    reducers,
    effects
}

export { ResourceStoreState };
export default model;
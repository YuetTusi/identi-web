import { User } from '@/schema/user';
import { Model } from 'dva';
import effects from './effects';
import reducers from './reducers';

/**
 * 用户StoreState
 */
interface UserStoreState {
    /**
     * 用户表数据
     */
    data: User[],
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

    namespace: 'user',
    state: {
        data: [],
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        loading: false
    },
    reducers,
    effects
};

export { UserStoreState };
export default model;
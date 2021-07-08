import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';
import { Role } from '@/schema/role';

/**
 * 角色StoreState
 */
interface RoleStoreState {
    /**
     * 资源表数据
     */
    data: Role[],
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
    namespace: 'role',
    state: {
        data: [],
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        loading: false
    },
    reducers,
    effects
}

export { RoleStoreState };
export default model;
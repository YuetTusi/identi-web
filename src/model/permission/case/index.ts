import { LawCase } from '@/schema/law-case';
import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';

/**
 * 案件StoreState
 */
interface LawCaseStoreState {
    /**
     * 用户表数据
     */
    data: LawCase[],
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

/**
 * 案件
 */
let model: Model = {
    namespace: 'lawCase',
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

export { LawCaseStoreState };
export default model;
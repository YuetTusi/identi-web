import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';
import { LawCase } from '@/schema/law-case';

interface DefaultStoreState {
    /**
     * 案件表数据
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
 * 我的案件
 */
let model: Model = {
    namespace: 'default',
    state: {},
    reducers,
    effects
}

export { DefaultStoreState };
export default model;
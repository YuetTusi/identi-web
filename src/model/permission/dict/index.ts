import { Model } from 'dva';
import effects from './effects';
import reducers from './reducers';
import { Dict } from '@/schema/dict';

interface DictStoreState {
    /**
     * 字典数据
     */
    data: Dict[],
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
     * 读取中
     */
    loading: boolean
}

/**
 * 字典model
 */
let model: Model = {
    namespace: 'dict',
    state: {
        data: [],
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        loading: false
    },
    effects,
    reducers
};

export { DictStoreState };
export default model;
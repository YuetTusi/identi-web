
import { Model } from 'dva';
import { ActionMessage } from '@/schema/action-message';
import reducers from './reducers';
import effects from './effects';

const defaultPageSize = 10;

interface MessageStoreState {

    /**
     * 消息数据
     */
    data: ActionMessage[],
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
     * 加载中
     */
    loading: boolean
}

const model: Model = {
    namespace: 'message',
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

export { MessageStoreState }
export default model;
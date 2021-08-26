import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';
import subscriptions from './subscriptions';
import { ActionMessage } from '@/schema/action-message';

interface ActionMessageListStoreState {

    /**
     * 消息数据
     */
    data: ActionMessage[],
    /**
     * 加载中
     */
    loading: boolean
}

let model: Model = {

    namespace: 'actionMessageList',
    state: {
        data: [],
        loading: false
    },
    reducers,
    effects,
    subscriptions
};

export { ActionMessageListStoreState };
export default model;
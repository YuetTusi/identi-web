import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';
import { ActionMessage } from '@/schema/action-message';

interface ActionMessageListStoreState {

    /**
     * 消息数据
     */
    data: ActionMessage[]
}

let model: Model = {

    namespace: 'actionMessageList',
    state: {
        data: []
    },
    reducers,
    effects
};

export { ActionMessageListStoreState };
export default model;
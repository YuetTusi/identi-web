import { AnyAction } from 'redux';
import { ActionMessageListStoreState } from '.';

export default {

    /**
     * 设置用户id
     * @param {ActionMessage[]} payload 消息数据
     */
    setData(state: ActionMessageListStoreState, { payload }: AnyAction) {

        state.data = payload;
        return state;
    },

    /**
     * 设置加载中
     * @param {boolean} payload 是否加载
     */
    setLoading(state: ActionMessageListStoreState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    }
};
import { AnyAction } from 'redux';
import { SettingStoreState } from '.';

export default {
    /**
     * 更新用户数据
     */
    setData(state: SettingStoreState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    }
};
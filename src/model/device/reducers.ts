import { AnyAction } from 'redux';
import { DeviceStoreState } from ".";

export default {

    /**
     * 设置加载中
     */
    setLoading(state: DeviceStoreState, { payload }: AnyAction) {

        state.loading = payload;
        return state;
    }
};
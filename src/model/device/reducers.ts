import { AnyAction } from 'redux';
import { DeviceStoreState } from ".";

export default {

    /**
     * 设置加载中
     */
    setLoading(state: DeviceStoreState, { payload }: AnyAction) {

        state.loading = payload;
        return state;
    },
    /**
     * 设置数据
     */
    setData(state: DeviceStoreState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    },
    /**
     * 设置分页数据
     * @param {number} pageIndex 当前页 
     * @param {number} pageSize 页尺寸
     * @param {number} total 总数 
     */
    setPage(state: DeviceStoreState, { payload }: AnyAction) {

        state.pageIndex = payload.pageIndex;
        state.pageSize = payload.pageSize;
        state.total = payload.total;
        return state;
    }
};
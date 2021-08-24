import { AnyAction } from 'redux';
import { MessageStoreState } from ".";

export default {
    /**
     * 更新表格数据
     */
    setData(state: MessageStoreState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    },
    /**
     * 更新分页数据
     * @param {number} pageIndex 当前页
     * @param {number} pageSize 页尺寸
     * @param {number} total 总数
     */
    setPage(state: MessageStoreState, { payload }: AnyAction) {
        state.pageIndex = payload.pageIndex;
        state.pageSize = payload.pageSize;
        state.total = payload.total;
        return state;
    },
    /**
     * 更新loading状态
     * @param {boolean} payload 是否加载 
     */
    setLoading(state: MessageStoreState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    }
};
import { AnyAction } from 'redux';
import { AttachmentTableStoreState } from ".";

export default {

    /**
     * 设置加载中
     */
    setLoading(state: AttachmentTableStoreState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    },
    /**
     * 设置数据
     */
    setData(state: AttachmentTableStoreState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    },
    /**
     * 设置分页信息
     */
    setPage(state: AttachmentTableStoreState, { payload }: AnyAction) {
        state.pageIndex = payload.pageIndex;
        state.pageSize = payload.pageSize;
        state.total = payload.total;
        return state;
    }
};
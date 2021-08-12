import { AnyAction } from 'redux';
import { AttachmentModalStoreState } from ".";

export default {
    /**
     * 设置可见
     */
    setVisible(state: AttachmentModalStoreState, { payload }: AnyAction) {
        state.visible = payload;
        return state;
    },
    /**
     * 设置加载中
     */
    setLoading(state: AttachmentModalStoreState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    },
    /**
     * 设置案件id
     */
    setCaseId(state: AttachmentModalStoreState, { payload }: AnyAction) {
        state.caseId = payload;
        return state;
    },
    /**
     * 设置数据
     */
    setData(state: AttachmentModalStoreState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    },
    /**
     * 设置分页信息
     */
    setPage(state: AttachmentModalStoreState, { payload }: AnyAction) {
        state.pageIndex = payload.pageIndex;
        state.pageSize = payload.pageSize;
        state.total = payload.total;
        return state;
    }
};
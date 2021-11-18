import { AnyAction } from 'redux';
import { DictStoreState } from ".";

export default {
    setData(state: DictStoreState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    },
    setPage(state: DictStoreState, { payload }: AnyAction) {
        state.pageIndex = payload.pageIndex;
        state.pageSize = payload.pageSize;
        state.total = payload.total;
        return state;
    },
    setLoading(state: DictStoreState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    }
};
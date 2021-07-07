import { AnyAction } from 'redux';
import { ResourceStoreState } from ".";

export default {
    setData(state: ResourceStoreState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    },
    setPage(state: ResourceStoreState, { payload }: AnyAction) {
        state.pageIndex = payload.pageIndex;
        state.pageSize = payload.pageSize;
        state.total = payload.total;
        return state;
    },
    setLoading(state: ResourceStoreState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    }
};
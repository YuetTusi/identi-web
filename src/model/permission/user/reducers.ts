import { AnyAction } from 'redux';
import { UserStoreState } from ".";

export default {
    setData(state: UserStoreState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    },
    setPage(state: UserStoreState, { payload }: AnyAction) {
        state.pageIndex = payload.pageIndex;
        state.pageSize = payload.pageSize;
        state.total = payload.total;
        return state;
    },
    setLoading(state: UserStoreState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    }
}
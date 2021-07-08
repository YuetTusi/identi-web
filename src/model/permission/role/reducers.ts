import { AnyAction } from 'redux';
import { RoleStoreState } from ".";

export default {
    setData(state: RoleStoreState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    },
    setPage(state: RoleStoreState, { payload }: AnyAction) {
        state.pageIndex = payload.pageIndex;
        state.pageSize = payload.pageSize;
        state.total = payload.total;
        return state;
    },
    setLoading(state: RoleStoreState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    }
}
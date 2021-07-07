import { AnyAction } from 'redux';
import { ResourceStoreState } from ".";

export default {
    setData(state: ResourceStoreState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    }
};
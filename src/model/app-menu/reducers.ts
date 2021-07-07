import { AnyAction } from 'redux';
import { AppMenuStoreState } from '.';

export default {
    
    setData(state: AppMenuStoreState, { payload }: AnyAction) {
        return {
            data: payload
        };
    }
}
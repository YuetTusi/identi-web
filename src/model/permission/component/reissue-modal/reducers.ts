import { AnyAction } from 'redux';
import { ReissueModalStoreState } from ".";

export default {

    /**
     * 设置弹框可见
     * @param {boolean} payload 是否可见
     */
    setVisible(state: ReissueModalStoreState, { payload }: AnyAction) {
        state.visible = payload;
        return state;
    },
    /**
    * 设置案件数据
    * @param {LawCase} payload 案件数据
    */
    setData(state: ReissueModalStoreState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    }
};
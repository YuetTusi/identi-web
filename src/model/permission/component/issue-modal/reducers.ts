import { AnyAction } from 'redux';
import { IssueModalStoreState } from ".";

export default {

    /**
     * 设置弹框可见
     * @param {boolean} payload 是否可见
     */
    setVisible(state: IssueModalStoreState, { payload }: AnyAction) {
        state.visible = payload;
        return state;
    },
    /**
    * 设置案件数据
    * @param {LawCase} payload 案件数据
    */
    setData(state: IssueModalStoreState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    }
};
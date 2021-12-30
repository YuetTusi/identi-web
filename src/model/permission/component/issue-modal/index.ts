import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';
import { LawCase4Table } from '@/view/permission/law-case/props';

interface IssueModalStoreState {
    /**
     * 是否显示
     */
    visible: boolean,
    /**
     * 案件数据
     */
    data?: LawCase4Table
}

let model: Model = {
    namespace: 'issueModal',
    state: {
        visible: false,
        data: undefined
    },
    reducers,
    effects
}

export { IssueModalStoreState };
export default model;
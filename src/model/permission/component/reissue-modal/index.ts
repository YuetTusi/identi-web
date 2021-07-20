import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';
import { LawCase4Table } from '@/view/permission/law-case/props';

interface ReissueModalStoreState {
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
    namespace: 'reissueModal',
    state: {
        visible: false,
        data: undefined
    },
    reducers,
    effects
}

export { ReissueModalStoreState };
export default model;
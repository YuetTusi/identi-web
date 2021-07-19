import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';

/**
 * 我的案件
 */
let model: Model = {
    namespace: 'default',
    state: {},
    reducers,
    effects
}

export default model;
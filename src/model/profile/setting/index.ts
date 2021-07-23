import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';
import { User } from '@/schema/user';


interface SettingStoreState {
    /**
     * 当前登录用户数据
     */
    data: User[];
}

/**
 *  用户设置
 */
let model: Model = {
    namespace: 'setting',
    state: {
        data: []
    },
    reducers,
    effects
}

export { SettingStoreState };
export default model;
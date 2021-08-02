import { Model } from 'dva';
import { User } from '@/schema/user';
import reducers from './reducers';
import effects from './effects';


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
    state: { data: [] },
    reducers,
    effects
}

export { SettingStoreState };
export default model;
import { Model } from 'dva';
import reducers from './reducers';
import subscriptions from './subscriptions';

interface AuthStoreState {
    /**
     * 登录用户id
     */
    uid: string | null;
    /**
     * 登录用户
     */
    username: string | null;
    /**
     * 角色
     */
    role: string[]
}

/**
 * 登录用户model
 */
let model: Model = {
    namespace: 'auth',
    state: {
        uid: null,
        username: null,
        role: []
    },
    reducers,
    subscriptions
};

export { AuthStoreState };
export default model;
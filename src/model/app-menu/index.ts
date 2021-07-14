import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';
import subscriptions from './subscriptions';

interface AppMenuStoreState {
    data: ResourceItem[]
}

interface ResourceItem {
    /**
     * ID
     */
    id: string,
    /**
     * 父级资源ID
     */
    pid: string,
    /**
     * 层级
     */
    level: number,
    /**
     * 名称
     */
    name: string,
    /**
     * 路径
     */
    key: string,
    /**
     * 资源类型
     */
    type: string,
    /**
     * 子项
     */
    children: ResourceItem[]
}

/**
 * 登录用户model
 */
let model: Model = {
    namespace: 'appMenu',
    state: {
        data: []
    },
    reducers,
    effects,
    subscriptions
};

export { AppMenuStoreState, ResourceItem };
export default model;
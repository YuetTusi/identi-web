import { Dispatch } from "redux";
import { RouteComponentProps } from "dva/router";

/**
 * 经DvaConnect注入的组件
 */
interface StoreComponent<MatchParam = any> extends RouteComponentProps<MatchParam> {
    /**
     * Dispatcher方法
     */
    dispatch: Dispatch<any>;
}

export { StoreComponent };
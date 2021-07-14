import { AnyAction } from 'redux';
import { EffectsCommandMap } from "dva";
import { routerRedux } from 'dva/router';
import { request } from '@/utility/request';
import { AppMenuStoreState, ResourceItem } from '.';
import { helper } from '@/utility/helper';

export default {
    /**
     * 查询当前登录用户的菜单
     * @param {string} payload.id 用户id
     */
    *queryMenuByUserId({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
        const { id } = payload;
        try {
            const data: ResourceItem[] = yield call(request, { url: `menu/${id}`, method: 'GET' });
            yield put({ type: 'setData', payload: data });
        } catch (error) {
            console.log(error);
        }
    },
    // /**
    //  * 验证当前访问路径是否允许
    //  * @param {string} payload 当前路由路径
    //  */
    // *allowByRoutePath({ payload }: AnyAction, { put, select }: EffectsCommandMap) {
    //     console.log(payload);
    //     const { data }: AppMenuStoreState = yield select((state: any) => state.appMenu);

    //     if (data.length !== 0 && !helper.hasRoute(data, payload)) {
    //         put(routerRedux.push('/'));
    //     }
    // }
};
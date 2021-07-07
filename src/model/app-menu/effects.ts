import { AnyAction } from 'redux';
import { EffectsCommandMap } from "dva";
import { request } from '@/utility/request';
import { ResourceItem } from '.';

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
    }
};
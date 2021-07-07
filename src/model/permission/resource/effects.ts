
import { AnyAction } from 'redux';
import { EffectsCommandMap } from "dva";
import { request, RequestReslut } from '@/utility/request';
import { Resource } from '@/schema/resource';
import message from 'antd/lib/message';

export default {
    /**
     * 查询资源表
     * @param {any} payload.condition 查询条件
     * @param {number} payload.pageIndex 当前页
     * @param {number} payload.pageSize 页尺寸
     */
    *queryResource({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const { condition, pageIndex, pageSize } = payload;

        try {
            const { code, data }: RequestReslut<{ data: Resource[], total: number }> = yield call(request, { url: 'resource', method: 'POST', data: { condition, pageIndex, pageSize } });
            if (code === 0) {
                yield put({ type: 'setData', payload: data.data });
            } else {
                yield put({ type: 'setData', payload: [] });
            }
        } catch (error) {
            message.destroy();
            message.error(`查询失败`);
        }
    }
};
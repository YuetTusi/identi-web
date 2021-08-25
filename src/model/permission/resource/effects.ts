
import { AnyAction } from 'redux';
import { EffectsCommandMap } from "dva";
import { request, RequestResult } from '@/utility/request';
import { Resource } from '@/schema/resource';
import message from 'antd/lib/message';

const defaultPageSize = 10;

export default {
    /**
     * 查询资源表
     * @param {any} payload.condition 查询条件
     * @param {number} payload.pageIndex 当前页
     * @param {number} payload.pageSize 页尺寸
     */
    *queryResource({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const { condition, pageIndex, pageSize = defaultPageSize } = payload;
        yield put({ type: 'setLoading', payload: true });
        try {
            const { code, data }: RequestResult<{ data: Resource[], total: number }> = yield call(request, { url: 'resource/list', method: 'POST', data: { condition, pageIndex, pageSize } });

            if (code === 0) {
                yield put({ type: 'setData', payload: data.data });
                yield put({
                    type: 'setPage', payload: {
                        pageIndex,
                        pageSize,
                        total: data.total
                    }
                });
            } else {
                yield put({ type: 'setData', payload: [] });
                yield put({
                    type: 'setPage', payload: {
                        pageIndex: 1,
                        pageSize: defaultPageSize,
                        total: 0
                    }
                });
            }
        } catch (error) {
            message.destroy();
            message.error(`查询失败`);
        } finally {
            yield put({ type: 'setLoading', payload: false });
        }
    },
    /**
     * 更新顺序
     * @param {string} payload.id  
     * @param {number} payload.seq
     */
    *updateSeq({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
        message.destroy();
        const { id, seq } = payload as { id: string, seq: number };
        try {
            const { code, data }: RequestResult<number> = yield call(request, {
                url: `resource/${id}/seq`, method: 'PUT', data: { form: { seq } }
            });
            if (code === 0 && data > 0) {
                message.success('顺序更新成功');
                yield put({
                    type: 'queryResource',
                    payload: { pageIndex: 1, pageSize: defaultPageSize, condition: { id: '' } }
                });
            } else {
                message.success('顺序更新失败');
            }
        } catch (error) {
            message.success('顺序更新失败');
        }
    }
};
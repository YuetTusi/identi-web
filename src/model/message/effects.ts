import { AnyAction } from 'redux';
import { EffectsCommandMap } from "dva";
import message from 'antd/lib/message';
import { ActionMessage } from '@/schema/action-message';
import { request, RequestResult } from '@/utility/request';


const defaultPageSize = 10;

export default {
    /**
     * 查询消息数据
     * @param {Number} payload.pageIndex 当前页
     * @param {Number} payload.pageSize 页尺寸
     * @param {any} payload.condition 条件
     */
    *queryByPage({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
        const { condition, pageIndex, pageSize = defaultPageSize } = payload;
        yield put({ type: 'setLoading', payload: true });
        try {
            const { code, data }: RequestResult<{
                total: number, data: ActionMessage[]
            }> = yield call(request, {
                url: `message/list`,
                method: 'POST',
                data: { condition, pageIndex, pageSize }
            });
            if (code === 0) {
                yield put({
                    type: 'setPage', payload: {
                        pageIndex, pageSize, total: data.total
                    }
                });
                yield put({ type: 'setData', payload: data.data });
            } else {
                yield put({
                    type: 'setPage', payload: {
                        pageIndex: 1, pageSize: defaultPageSize, total: 0
                    }
                });
                yield put({ type: 'setData', payload: [] });
            }
        } catch (error) {
            message.destroy();
            message.error('查询消息失败');
            console.log(error);
        } finally {
            yield put({ type: 'setLoading', payload: false });
        }
    }
};
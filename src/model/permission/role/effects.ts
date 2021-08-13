import { AnyAction } from 'redux';
import { EffectsCommandMap } from "dva";
import { request, RequestResult } from '@/utility/request';
import { Role } from '@/schema/role';
import message from 'antd/lib/message';

const defaultPageSize = 10;

export default {

    /**
     * 查询角色表
     * @param {any} payload.condition 查询条件
     * @param {number} payload.pageIndex 当前页
     * @param {number} payload.pageSize 页尺寸
     */
    *queryRole({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const { condition, pageIndex, pageSize = defaultPageSize } = payload;
        yield put({ type: 'setLoading', payload: true });
        try {
            const { code, data, error }: RequestResult<{ data: Role[], total: number }> =
                yield call(request, { url: 'role/list', method: 'POST', data: { condition, pageIndex, pageSize } });

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
                message.error(`查询失败：${error?.message}`);
            }
        } catch (error) {
            message.destroy();
            message.error(`查询失败`);
        } finally {
            yield put({ type: 'setLoading', payload: false });
        }
    }
};
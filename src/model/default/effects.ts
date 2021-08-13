

import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import message from 'antd/lib/message';
import { LawCase } from '@/schema/law-case';
import { helper } from '@/utility/helper';
import { request, RequestResult } from '@/utility/request';

const defaultPageSize: number = 10;

export default {
    /**
     * 查询我的案件表
     * @param {any} payload.condition 查询条件
     * @param {number} payload.pageIndex 当前页
     * @param {number} payload.pageSize 页尺寸
     */
    *queryMyCase({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const { condition, pageIndex, pageSize = defaultPageSize } = payload;
        yield put({ type: 'setLoading', payload: true });
        try {
            // const authState: AuthStoreState = yield select((state: any) => ({ auth: state.auth }));
            const params = {
                ...condition,
                identi_id: helper.getUId() //鉴定人id必传
            }

            const { code, data, error }: RequestResult<{ data: LawCase[], total: number }> =
                yield call(request, { url: 'default/list', method: 'POST', data: { condition: params, pageIndex, pageSize } });

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
            console.log(error);
            message.destroy();
            message.error(`查询失败`);
        } finally {
            yield put({ type: 'setLoading', payload: false });
        }
    },
};
import { AnyAction } from 'redux';
import { EffectsCommandMap } from "dva";
import message from 'antd/lib/message';
import { LawCase } from '@/schema/law-case';
import { request, RequestResult } from '@/utility/request';

const defaultPageSize = 20;

export default {
    /**
     * 查询案件表
     * @param {any} payload.condition 查询条件
     * @param {number} payload.pageIndex 当前页
     * @param {number} payload.pageSize 页尺寸
     */
    *queryLawCase({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const { condition, pageIndex, pageSize = 20 } = payload;
        yield put({ type: 'setLoading', payload: true });
        try {
            const { code, data, error }: RequestResult<{ data: LawCase[], total: number }> =
                yield call(request, { url: 'law-case/list', method: 'POST', data: { condition, pageIndex, pageSize } });

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
                        pageSize: 20,
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
    /**
     * 删除案件
     * @param {string} payload 案件id
     */
    *delCase({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        message.destroy();
        try {
            const { code, data }: RequestResult<boolean> = yield call(request, { url: `/law-case/${payload}`, method: 'DELETE' });
            if (code === 0 && data) {
                yield put({ type: 'queryLawCase', payload: { pageIndex: 1, pageSize: defaultPageSize, condition: null } });
                message.success('案件删除成功');
            }
        } catch (error) {
            message.error('删除案件失败');
        }
    }
};
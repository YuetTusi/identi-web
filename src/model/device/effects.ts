import { AnyAction } from 'redux';
import { EffectsCommandMap, routerRedux } from 'dva';
import message from 'antd/lib/message';
import { request, RequestResult } from '@/utility/request';
import { Suspect } from '@/schema/suspect';

const defaultPageSize = 10;

export default {

    /**
     * 添加设备
     */
    *insert({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
        message.destroy();
        yield put({ type: 'setLoading', payload: true });
        try {
            const { code, data }: RequestResult<number> = yield call(request, {
                url: 'device',
                method: 'POST',
                data: { form: payload }
            });
            if (code === 0 && data > 0) {
                message.success('设备添加成功');
                yield put(routerRedux.push('/default'));
            } else {
                message.error('设备添加失败');
            }
        } catch (error) {
            message.error('设备添加失败');
        } finally {
            yield put({ type: 'setLoading', payload: false });
        }
    },
    /**
     * 删除设备
     * @param {string} payload.id 设备id
     * @param {string} payload.caseId 案件id
     */
    *del({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
        const { id, caseId } = payload;
        message.destroy();
        yield put({ type: 'setLoading', payload: true });
        try {
            const { code, data }: RequestResult<{ success: boolean }> = yield call(request, {
                url: `device/${id}`,
                method: 'DELETE'
            });
            if (code === 0 && data.success) {
                message.success('设备删除成功');
                yield put({
                    type: 'queryByPage', payload: {
                        pageIndex: 1,
                        pageSize: defaultPageSize,
                        condition: { law_case_id: caseId }
                    }
                });
            } else {
                message.error('设备删除失败');
            }
        } catch (error) {
            message.error('设备删除失败');
        } finally {
            yield put({ type: 'setLoading', payload: false });
        }
    },
    /**
     * 分页查询
     * @param {number} pageIndex 当前页
     * @param {number} pageSize 页尺寸
     * @param {any} condition 条件
     */
    *queryByPage({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        yield put({ type: 'setLoading', payload: true });
        try {
            const { code, data }: RequestResult<{ data: Suspect[], total: number }> = yield call(request, {
                url: 'device/list',
                method: 'POST',
                data: { form: payload }
            });
            if (code === 0) {
                yield put({ type: 'setData', payload: data.data });
                yield put({
                    type: 'setPage', payload: {
                        pageIndex: payload.pageIndex,
                        pageSize: payload.pageSize,
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
                message.error('设备查询失败');
            }
        } catch (error) {
            message.error('设备查询失败');
        } finally {
            yield put({ type: 'setLoading', payload: false });
        }
    }
};
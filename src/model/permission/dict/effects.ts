
import { AnyAction } from 'redux';
import { EffectsCommandMap } from "dva";
import message from 'antd/lib/message';
import { request, RequestResult } from '@/utility/request';
import { Dict } from '@/schema/dict';

const defaultPageSize = 10;

export default {
    /**
     * 查询字典表
     * @param {any} payload.condition 查询条件
     * @param {number} payload.pageIndex 当前页
     * @param {number} payload.pageSize 页尺寸
     */
    *query({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const { condition, pageIndex, pageSize = defaultPageSize } = payload;
        yield put({ type: 'setLoading', payload: true });
        try {
            const { code, data }: RequestResult<{ data: Dict[], total: number }> = yield call(request, {
                url: 'dict/list',
                method: 'POST',
                data: { condition, pageIndex, pageSize }
            });

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
     * 添加字典
     */
    *insert({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
        try {
            const { code, data }: RequestResult<{ affectedRows: number }> =
                yield call(request, { url: 'dict', method: 'POST', data: { form: payload } });
            message.destroy();
            if (code === 0 && data.affectedRows > 0) {
                message.success('添加成功');
                yield put({
                    type: 'query', payload: {
                        pageIndex: 1, pageSize: defaultPageSize, condition: { category: '' }
                    }
                });
            } else {
                message.warn('添加失败');
            }
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * 编辑字典
     */
    *update({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
        try {
            const { code, data }: RequestResult<{ affectedRows: number }> =
                yield call(request, { url: 'dict', method: 'PUT', data: { form: payload } });
            message.destroy();
            if (code === 0 && data.affectedRows > 0) {
                message.success('编辑成功');
                yield put({
                    type: 'query', payload: {
                        pageIndex: 1, pageSize: defaultPageSize, condition: { category: '' }
                    }
                });
            } else {
                message.warn('编辑失败');
            }
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * 删除字典
     */
    *del({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
        try {
            const { code, data }: RequestResult<{ affectedRows: number }> =
                yield call(request, { url: `dict/${payload}`, method: 'DELETE' });
            message.destroy();
            if (code === 0 && data.affectedRows > 0) {
                message.success('删除成功');
                yield put({
                    type: 'query', payload: {
                        pageIndex: 1, pageSize: defaultPageSize, condition: { category: '' }
                    }
                });
            } else {
                message.warn('删除失败');
            }
        } catch (error) {
            console.log(error);
        }
    }
};
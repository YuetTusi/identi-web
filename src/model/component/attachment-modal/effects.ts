import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import message from 'antd/lib/message';
import { request, RequestResult } from '@/utility/request';
import { Attachment } from '@/schema/attachment';

export default {

    /**
     * 添加附件记录
     */
    *add({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        message.destroy();
        const { form } = payload;
        yield put({ type: 'setLoading', payload: true });
        try {
            const { code, data }: RequestResult<number>
                = yield call(request, {
                    url: 'case-attach', method: 'POST', data: payload
                });
            if (code === 0 && data > 0) {
                yield put({
                    type: 'query',
                    payload: {
                        pageIndex: 1, pageSize: 5, form: { id: form.case_id }
                    }
                });
                message.success('附件上传成功');
            } else {
                message.error('附件上传失败');
            }

        } catch (error) {
            console.log(error);
            message.error('附件上传失败');
        } finally {
            yield put({ type: 'setLoading', payload: false });
        }
    },
    /**
     * 删除附件
     * @param {Attachment} payload 附件
     */
    *del({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const { case_id } = payload as Attachment;
        try {
            const { code, data, error }: RequestResult<number>
                = yield call(request, {
                    url: 'case-attach', method: 'DELETE', data: { form: payload }
                });
            if (code === 0 && data > 0) {
                yield put({
                    type: 'query',
                    payload: {
                        pageIndex: 1, pageSize: 5, form: { id: case_id }
                    }
                });
                message.success('附件删除成功');
            } else if (code === 1) {
                message.error('附件删除失败');
            } else {
                console.log('code:', code,);
                console.log('data:', data);
                console.log('error:', error);
            }
        } catch (error) {
            message.error('附件删除失败');
        }
    },
    /**
     * 表格查询
     */
    *query({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const { form, pageIndex, pageSize } = payload;
        yield put({ type: 'setLoading', payload: true });
        try {
            const { code, data }: RequestResult<{ data: any[], total: number }>
                = yield call(request, {
                    url: 'case-attach/list', method: 'POST', data: {
                        form,
                        pageIndex,
                        pageSize
                    }
                });
            if (code === 0) {
                yield put({ type: 'setData', payload: data.data });
                yield put({ type: 'setPage', payload: { pageIndex, pageSize, total: data.total } });
            } else {
                message.error('查询附件数据失败');
            }

        } catch (error) {
            console.log(error);
            message.error('查询附件数据失败');
        } finally {
            yield put({ type: 'setLoading', payload: false });
        }
    }
};
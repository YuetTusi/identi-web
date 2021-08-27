import { AnyAction } from 'redux';
import { EffectsCommandMap, routerRedux } from 'dva';
import message from 'antd/lib/message';
import { request, RequestResult } from '@/utility/request';


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
    }
};
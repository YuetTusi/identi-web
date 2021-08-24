import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import message from 'antd/lib/message';
import { helper } from '@/utility/helper';
import { request, RequestResult } from '@/utility/request';
import { ActionMessage, ActionMessageState } from '@/schema/action-message';

export default {

    /**
     * 查询用户消息
     * @param {string} payload.userId 用户id
     * @param {ActionMessageState} payload.state 已读状态
     */
    *queryMessage({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const { userId, state = '0' } = payload;

        try {
            const { code, data }: RequestResult<ActionMessage[]> = yield call(request, {
                url: `message/user/${userId}?read=${state}`,
                method: 'GET'
            });
            if (code === 0) {
                yield put({ type: 'setData', payload: data });
            } else {
                yield put({ type: 'setData', payload: [] });
            }
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * 增加操作消息
     * @param {ActionMessage} payload  消息数据
     */
    *add({ payload }: AnyAction, { fork }: EffectsCommandMap) {

        try {
            const success: boolean = yield fork([helper, 'addActionMessage'], payload);
            console.log(`添加操作消息${success ? '成功' : '失败'}`);
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * 查询用户消息
     * @param {ActionMessage} payload 消息
     */
    *update({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const userId = helper.getUId();
        try {
            const { code, data }: RequestResult<number> = yield call(request, {
                url: `message/user/${payload.id}`,
                data: { form: payload },
                method: 'PUT'
            });
            if (code === 0 && data > 0) {
                yield put({
                    type: 'queryMessage', payload: {
                        userId, state: ActionMessageState.Unread
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * 更新已读状态
     * @param {string} payload 主键id
     */
    *updateReadState({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
        const userId = helper.getUId();
        try {
            const { code, data }: RequestResult<number> = yield call(request, {
                url: `message/${payload}/read`,
                method: 'PUT'
            });
            if (code === 0 && data > 0) {
                yield put({
                    type: 'queryMessage', payload: {
                        userId, state: ActionMessageState.Unread
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * 更新全部已读状态
     * @param {string} payload 用户id
     */
    *updateAllReadState({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        message.destroy();
        try {
            const { code, data }: RequestResult<number> = yield call(request, {
                url: `message/user/${payload}`,
                method: 'PUT'
            });
            if (code === 0 && data > 0) {
                yield put({
                    type: 'queryMessage', payload: {
                        userId: payload, state: ActionMessageState.Unread
                    }
                });
                message.success('消息全部已读');
            }
        } catch (error) {
            console.log(error);
        }
    }
};
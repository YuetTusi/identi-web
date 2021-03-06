import { AnyAction } from 'redux';
import { EffectsCommandMap, routerRedux } from 'dva';
import message from 'antd/lib/message';
import { User } from '@/schema/user';
import { request, RequestResult } from '@/utility/request';

export default {

    /**
     * 查询登录用户数据
     * @param {string} payload 用户id
     */
    *queryUserById({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
        try {
            //用户若有多个角色，会是多条记录
            const { code, data, error }: RequestResult<User[]> = yield call(request, {
                url: `user/${payload}`,
                method: 'GET'
            });

            if (code === 0 && data.length > 0) {
                yield put({ type: 'setData', payload: data });
            } else {
                console.log(`查询用户数据失败, ${error}`);
                message.error('查询用户数据失败');
            }
        } catch (e) {
            message.error(`查询用户数据失败:${e.message}`);
        }
    },
    /**
     * 重置用户密码
     * @param payload.id 用户id 
     * @param payload.password 新密码
     */
    *resetPassword({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const { id, password } = payload;
        message.destroy();
        try {
            const { code, data, error }: RequestResult<number> = yield call(request, {
                url: `user/reset/${id}`,
                method: 'PUT',
                data: { form: { password } }
            });
            if (code === 0 && data > 0) {
                message.success('重置密码成功，请重新登录');
                sessionStorage.clear();
                yield put(routerRedux.push('/login'));
            } else {
                message.error('重置密码失败');
                console.log(`重置密码失败:${error?.stack}`);
            }
        } catch (error) {
            message.error(`重置密码失败，${error.message}`);
        }
    },
    /**
     * 更新用户
     * @param {User} payload 更新后的用户
     */
    *update({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        message.destroy();
        try {
            const { code, data, error }: RequestResult<number> = yield call(request, {
                url: `user/${payload.id}`,
                method: 'PUT',
                data: { form: payload }
            });
            if (code === 0 && data > 0) {
                message.success('用户信息更新成功');
                yield put({ type: 'queryUserById', payload: payload.id });
            } else {
                message.error('用户信息更新失败');
                console.log(`用户信息更新失败:${error?.stack}`);
            }
        } catch (error) {
            message.error(`用户信息更新失败${error.message}`);
        }
    }
};
import dayjs from 'dayjs';
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import message from 'antd/lib/message';
import { request, RequestResult } from '@/utility/request';
import { CaseRec } from '@/schema/case-rec';
import { LawCase } from '@/schema/law-case';
import { ActionMessage, ActionMessageState } from '@/schema/action-message';
import { helper } from '@/utility/helper';

const defaultPageSize = 10;

export default {

    /**
     * 下发鉴定
     * @param {CaseRec} payload.caseRec 记录数据
     * @param {number} payload.lawCase 案件数据
     */
    *issue({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        message.destroy();
        const { caseRec, lawCase } = payload as { caseRec: CaseRec, lawCase: LawCase };
        try {
            const { code, data }: RequestResult<boolean> = yield call(request, {
                url: '/rec/append',
                data: {
                    form: { caseRec, lawCase }
                },
                method: 'POST'
            });
            if (code === 0 && data) {
                message.success('处理成功');
                const msg = new ActionMessage();
                msg.id = helper.newId();
                msg.case_id = lawCase.id;
                msg.user_id = lawCase.check_id;
                msg.read = ActionMessageState.Unread;
                msg.content = `案件「${lawCase.case_name}」待鉴定`;
                msg.create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
                msg.update_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
                yield put({ type: 'actionMessageList/add', payload: msg }); //Note:向鉴定人发送消息
                yield put({ type: 'setVisible', payload: false });
                yield put({ type: 'setData', payload: undefined });
            } else {
                message.error('处理失败');
            }
        } catch (error) {
            message.error('处理失败');
        }
        finally {
            yield put({
                type: 'lawCase/queryLawCase', payload: {
                    pageIndex: 1,
                    pageSize: defaultPageSize,
                    condition: null
                }
            });
        }
    }
}
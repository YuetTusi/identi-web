import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import message from 'antd/lib/message';
import { request, RequestResult } from '@/utility/request';
import { CaseRec } from '@/schema/case-rec';
import { CaseState } from '@/schema/law-case';

export default {

    /**
     * 审核驳回并重新下发鉴定
     * @param {CaseRec} payload.caseRec 记录数据
     * @param {number} payload.state 案件状态
     */
    *issueAfterReject({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const { caseRec, state } = payload as { caseRec: CaseRec, state: CaseState };

        message.destroy();
        try {
            const { code, data }: RequestResult<boolean> = yield call(request, {
                url: '/rec/append',
                data: {
                    form: { ...caseRec, state }
                },
                method: 'POST'
            });
            if (code === 0 && data) {
                message.success('审核完成');
                yield put({ type: 'setVisible', payload: false });
                yield put({ type: 'setData', payload: undefined });
            } else {
                message.error('操作失败');
            }
        } catch (error) {
            message.error('操作失败');
        }
        finally {
            yield put({
                type: 'lawCase/queryLawCase', payload: {
                    pageIndex: 1,
                    pageSize: 20,
                    condition: null
                }
            });
        }
    }
}
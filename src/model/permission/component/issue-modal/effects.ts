import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import message from 'antd/lib/message';
import { request, RequestResult } from '@/utility/request';
import { CaseRec } from '@/schema/case-rec';
import { LawCase } from '@/schema/law-case';

export default {

    /**
     * 下发鉴定
     * @param {CaseRec} payload.caseRec 记录数据
     * @param {number} payload.lawCase 案件数据
     */
    *issue({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const { caseRec, lawCase } = payload as { caseRec: CaseRec, lawCase: LawCase };

        message.destroy();
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
                    pageSize: 20,
                    condition: null
                }
            });
        }
    }
}
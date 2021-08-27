import { Location } from 'history';
import { SubscriptionAPI } from "dva";
import { helper } from "@/utility/helper";
import { ActionMessageState } from "@/schema/action-message";
import { fetchMessageTask } from '@/worker/loop-task';

let messageWorker: Worker | null = null;

export default {

    /**
     * 启动任务定时拉取消息
     */
    startFetchMessageTask({ dispatch, history }: SubscriptionAPI) {

        history.listen(({ pathname }: Location) => {

            switch (pathname) {
                case '/':
                case '/login':
                    if (messageWorker !== null) {
                        messageWorker.terminate();
                        messageWorker = null;
                    }
                    break;
                default:
                    if (messageWorker === null) {
                        messageWorker = helper.createWebWorker(fetchMessageTask);
                        messageWorker.onmessage = ({ data }: MessageEvent<any>) => {
                            switch (data) {
                                case 'read-message':
                                    dispatch({
                                        type: 'actionMessageList/queryMessage',
                                        payload: { userId: helper.getUId(), state: ActionMessageState.Unread }
                                    });
                                    break;
                            }
                        }
                    }
                    break;
            }
        });
    }
}
import { SubscriptionAPI } from "dva";
import { request } from "@/utility/request";
import { helper } from '@/utility/helper';

const uid = helper.getUId();

export default {

    /**
     * 读取登录用户数据
     */
    readCurrentAuth({ dispatch }: SubscriptionAPI) {

        if (uid !== null) {
            request({ url: `login/${uid}` }).then((res: any) => {
                if (res.success) {
                    const { uid, username, role } = res.data;
                    dispatch({
                        type: 'setAuth',
                        payload: { uid, role, username }
                    });
                    dispatch({
                        type: 'appMenu/queryMenuByUserId',
                        payload: { id: uid }
                    });
                }
            });
        }
    }
}
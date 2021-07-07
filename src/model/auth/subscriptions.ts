import { request } from "@/utility/request";
import { SubscriptionAPI } from "dva";

export default {

    /**
     * 读取登录用户数据
     * @param param0 
     */
    readCurrentAuth({ dispatch }: SubscriptionAPI) {

        const uid = sessionStorage.getItem('uid');

        if (uid !== null) {
            request(`login/${uid}`).then((res: any) => {
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
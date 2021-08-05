import { AnyAction } from "redux"
import { AuthStoreState } from "."

export default {
    /**
     * 更新登录角色信息
     */
    setAuth(state: AuthStoreState, { payload }: AnyAction) {
        return {
            uid: payload.uid,
            username: payload.username,
            role: payload.role
        }
    }
}
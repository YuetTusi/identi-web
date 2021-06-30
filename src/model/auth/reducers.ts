import { AnyAction } from "redux"
import { AuthStoreState } from "."

export default {

    setAuth(state: AuthStoreState, { payload }: AnyAction) {
        return {
            uid: payload.uid,
            username: payload.username,
            role: payload.role
        }
    }
}
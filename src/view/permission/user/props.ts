import { UserStoreState } from "@/model/permission/user";
import { StoreComponent } from "@/schema/model-type";

interface Prop extends StoreComponent {
    user: UserStoreState
}

/**
 * 表单属性
 */
interface SearchFormProp {

    /**
     * 查询表单提交
     * @param data 表单
     */
    onSearchFormSubmit: (data: FormValue) => void
}

interface FormValue {
    /**
     * 用户名
     */
    username: string
}

/**
 * 操作类型
 */
enum ActionType {
    Edit,
    DEL,
    RESET,
    ROLE
}

export { Prop, SearchFormProp, FormValue, ActionType };
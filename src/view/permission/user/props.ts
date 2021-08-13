import { FormInstance } from "antd/es/form/Form";

interface Prop { }

/**
 * 表单属性
 */
interface SearchFormProp {

    /**
     * 表单实例
     */
    formRef: FormInstance<FormValue>,
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
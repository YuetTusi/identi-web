import { FormInstance } from "antd/lib/form";

interface MessageProp {

}

/**
 * 查询组件
 */
interface SearchFormProp {
    /**
     * 表单引用
     */
    formRef: FormInstance<FormValue>,
    /**
     * 查询Submit
     */
    onSearchFormSubmit: (values: FormValue) => void
}

/**
 * 表单值
 */
interface FormValue {
    /**
     * 消息读取状态
     */
    read: number
}

export { MessageProp, SearchFormProp, FormValue };
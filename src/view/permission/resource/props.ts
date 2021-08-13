import { FormInstance } from "antd/lib/form";

/**
 * 属性
 */
interface Prop { }

/**
 * 表单属性
 */
interface SearchFormProp {

    /**
     * 表单实例
     */
    formRef: FormInstance<FormValue>
    /**
     * 查询表单提交
     * @param data 表单
     */
    onSearchFormSubmit: (data: FormValue) => void
}

interface FormValue {
    /**
     * id
     */
    id: string
}

export { Prop, SearchFormProp, FormValue };
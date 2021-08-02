
/**
 * 属性
 */
interface Prop {}

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
     * id
     */
    id: string
}

export { Prop, SearchFormProp, FormValue };
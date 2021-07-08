import { ResourceStoreState } from "@/model/permission/resource";
import { StoreComponent } from "@/schema/model-type";

/**
 * 属性
 */
interface Prop extends StoreComponent {
    /**
     * Resource仓库State
     */
    resource: ResourceStoreState;
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
     * id
     */
    id: string
}

export { Prop, SearchFormProp, FormValue };
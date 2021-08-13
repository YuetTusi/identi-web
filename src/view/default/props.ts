import { DefaultStoreState } from "@/model/default";
import { LawCase } from "@/schema/law-case";
import { StoreComponent } from "@/schema/model-type";
import { FormInstance } from "antd/es/form/Form";

interface Prop extends StoreComponent {
    default: DefaultStoreState
}

/**
 * 查询表单属性
 */
interface SearchFormProp {

    /**
     * 表单实例
     */
    formRef: FormInstance<LawCase>,
    /**
     * 表单Submit
     */
    onSearchFormSubmit: (data: LawCase) => void
}

/**
 * 案件实体（扩展用于表格展示）
 */
class LawCase4Table extends LawCase {
    /**
     * 审核人
     */
    check_username?: string;
    /**
     * 鉴定人
     */
    identi_username?: string;
}


export { Prop, SearchFormProp, LawCase4Table };
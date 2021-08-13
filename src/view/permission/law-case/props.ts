import { FormInstance } from "antd/es/form/Form";
import { LawCase } from "@/schema/law-case";

interface SearchFormProp {

    formRef: FormInstance<LawCase>,

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

export { SearchFormProp, LawCase4Table };
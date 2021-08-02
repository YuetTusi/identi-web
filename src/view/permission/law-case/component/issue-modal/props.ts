import { StoreComponent } from "@/schema/model-type";

interface IssueModalProp extends StoreComponent {}

/**
 * 表单
 */
interface FormValue {

    /**
     * 鉴定人id
     */
    identi_id: string,
    /**
     * 审核人id
     */
    check_id: string,
    /**
     * 说明
     */
    action_note: string
}

export { IssueModalProp, FormValue };
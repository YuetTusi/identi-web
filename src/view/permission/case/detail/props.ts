import { LawCase } from "@/schema/law-case";

interface DetailProp {

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

export { DetailProp, LawCase4Table };
import { BaseEntity } from "./base-entity";

/**
 * 鉴定记录
 */
class CaseRec extends BaseEntity {
    /**
     * 案件id（FK）
     */
    case_id: string = '';
    /**
     * 鉴定时间
     */
    rec_time?: any;
    /**
     * 鉴定地点
     */
    rec_place?: string;
    /**
     * 意见
     */
    suggest?: string;
    /**
     * 动作原因
     */
    action_note?: string;
    /**
     * 动作时间
     */
    action_time?: any;
}

export { CaseRec };
import { BaseEntity } from "./base-entity";

/**
 * 案件状态
 */
enum CaseState {
    /**
     * 未鉴定
     */
    NotIdenti,
    /**
     * 待鉴定
     */
    ToBeIdenti,
    /**
     * 驳回
     */
    Reject,
    /**
     * 审核
     */
    Approval,
    /**
     * 完成
     */
    Finish
}

/**
 * 案件表
 */
class LawCase extends BaseEntity {

    /**
     * 审核人id
     */
    public check_id?: string;
    /**
     * 鉴定人id
     */
    public identi_id?: string;
    /**
     * 状态
     */
    public state?: CaseState;
    /**
     * 案件名称
     */
    public case_name: string = '';
    /**
     * 检验单位
     */
    public check_unit_name?: string;
    /**
     * 采集人员编号&警号
     */
    public officer_no?: string;
    /**
     * 采集人员名称
     */
    public officer_name?: string;
    /**
     * 网安部门案件编号
     */
    public security_case_no?: string;
    /**
    * 网安部门案件类型
    */
    public security_case_type?: string;
    /**
     * 网安部门案件名称
     */
    public security_case_name?: string;
    /**
     * 执法办案系统案件编号
     */
    public handle_case_no?: string;
    /**
     * 执法办案系统案件类别
     */
    public handle_case_type?: string;
    /**
     * 执法办案系统案件名称
     */
    public handle_case_name?: string;
}

export { LawCase, CaseState };
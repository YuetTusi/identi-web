import { BaseEntity } from './base-entity';

/**
 * 嫌疑人表
 */
class Suspect extends BaseEntity {

    /**
     * 案件id 关联LawCase表主键
     */
    public law_case_id?: string;
    /**
     * 案件编号
     */
    public case_id?: string;
    /**
     * 案件名称
     */
    public case_name?: string;
    /**
     * 案件类型代码
     */
    public case_type_code?: string;
    /**
     * 案件类型
     */
    public case_type?: string;
    /**
     * 案别代码
     */
    public ab?: string;
    /**
     * 案别名称
     */
    public ab_name?: string;
    /**
     * 人员编号
     */
    public object_id?: string;
    /**
     * 姓名（持有人）
     */
    public owner_name?: string;
    /**
     * 别名（曾用名）
     */
    public bm?: string;
    /**
     * 证件类型Code
     */
    public identity_id_type_code?: string;
    /**
     * 证件类型名称
     */
    public identity_id_type?: string;
    /**
     * 证件号码
     */
    public identity_id?: string;
    /**
     * 户籍地址
     */
    public hjdz?: string;
    /**
     * 现地址
     */
    public dz?: string;
    /**
     * 工作单位
     */
    public gzdw?: string;
    /**
     * 国家编码
     */
    public guojia_code?: string;
    /**
     * 国家
     */
    public guojia?: string;
    /**
     * 民族编码
     */
    public minzu_code?: string;
    /**
     * 民族
     */
    public minzu?: string;
    /**
     * 手机号码
     */
    public phone?: string;
    /**
     * 描述
     */
    public desc?: string;
    /**
     * 采集日期
     */
    public date?: string;
    /**
     * 采集类型
     */
    public flag?: string;
    /**
     * 采集警员编号
     */
    public officer_id?: string;
    /**
     * 采集警员姓名
     */
    public officer_name?: string;
    /**
     * 采集警员单位代码
     */
    public dept?: string;
    /**
     * 采集警员单位名称
     */
    public dept_name?: string;
    /**
     * 请求唯一id
     */
    public strflag?: string;
    /**
     * 手机绝对路径
     */
    public str_phone_path?: string;
    /**
     * 保留字段
     */
    public strreserved1?: string;
    /**
     * 保留字段
     */
    public strreserved2?: string;
    /**
     * 错误码
     */
    public errcode?: number;
    /**
     * 错误消息
     */
    public errmsg?: string;
    /**
     * 手机名称
     */
    public phone_name?: string;
    /**
     * 备注
     */
    public note?: string;
}

export { Suspect };

/**
 * 字典分类枚举
 */
export enum DictCategory {
    /**
     * 网安部门案件类别
     */
    CaseType = 'case-type',
    /**
     * 民族
     */
    Ethnicity = 'ethnicity',
    /**
     * 证件类型
     */
    CertificateType = 'certificate-type'
}

export class Dict {
    /**
     * 主键
     */
    public id: string = '';
    /**
     * 名称
     */
    public name: string = '';
    /**
     * 值
     */
    public value: string = '';
    /**
     * 顺序
     */
    public seq?: number;
    /**
     * 分类
     */
    public category: string = '';
}
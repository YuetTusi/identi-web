/**
 * 实体基类
 */
class BaseEntity {
    /**
     * 主键PK
     */
    id: string = '';
    /**
     * 创建时间
     */
    public create_time?: string;
    /**
     * 更新时间
     */
    public update_time?: string;
}

export { BaseEntity };
import { BaseEntity } from "./base-entity";

/**
 * 资源表
 */
class Resource extends BaseEntity {

    /**
     * 主键
     */
    public id: string = '';
    /**
     * 父级ID
     */
    public pid: string = '';
    /**
     * 名称
     */
    public name?: string;
    /**
     * 键值（路径）
     */
    public key?: string;
    /**
     * 类型
     */
    public type?: string;
    /**
     * 层级
     */
    public level?: number;
    /**
     * 顺序
     */
    public seq?: number;

    constructor() {
        super();
    }
}

export { Resource };
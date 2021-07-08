import { Resource } from "./resource";

/**
 * 角色表
 */
class Role extends BaseEntity {

    /**
     * 主键
     */
    public id: string = '';
    /**
     * 角色名称
     */
    public name?: string;
    /**
     * 角色描述
     */
    public desc?: string;
    /**
     * 分配的资源
     */
    public resource?: Resource[]

    constructor() {
        super();
    }
}

export { Role };
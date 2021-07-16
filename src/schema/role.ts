import { BaseEntity } from "./base-entity";

/**
 * 角色表
 */
class Role extends BaseEntity {
    /**
     * 角色名称
     */
    public name?: string;
    /**
     * 角色描述
     */
    public desc?: string;

    constructor() {
        super();
    }
}

export { Role };
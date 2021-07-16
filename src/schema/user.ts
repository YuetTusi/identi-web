import { BaseEntity } from "./base-entity";

/**
 * 用户表
 */
class User extends BaseEntity {

    /**
     * 用户名
     */
    public username: string = '';
    /**
     * 密码
     */
    public password: string = '';
    /**
     * 邮件
     */
    public mail?: string;
    /**
     * 真实姓名
     */
    public realname?: string;
    /**
     * 电话
     */
    public mobile?: string;
    /**
     * 描述
     */
    public desc?: string;
}

export { User };
interface AddProp {

}

/**
 * 新增用户表单
 */
interface AddFormValue {
    /**
     * 用户名
     */
    username: string,
    /**
     * 密码
     */
    password: string,
    /**
     * 重复密码
     */
    repassword?: string,
    /**
     * 邮件
     */
    mail?: string,
    /**
     * 手机电话
     */
    mobile?: string,
    /**
     * 真实姓名
     */
    realname?: string,
    /**
     * 描述
     */
    desc?: string
}

export { AddProp, AddFormValue }
interface EditProp {

}


/**
 * 编辑用户表单
 */
interface EditFormValue {
    /**
     * 用户名
     */
    username: string,
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


export { EditProp, EditFormValue };
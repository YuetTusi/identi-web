
import { FormInstance } from "antd/es/form/Form";
import { User } from "@/schema/user";

interface ModifyModalProp {

    /**
     * 显示
     */
    visible: boolean,
    /**
     * 当前用户
     */
    data?: User,
    /**
     * 保存handle
     * @param id 用户id
     * @param newPassword 重置密码
     */
    onOk: (data: User) => void,

    /**
     * 取消handle
     */
    onCancel: () => void
}

interface EditFormProp {
    /**
     * 数据
     */
    data?: User
    /**
     * 表单引用
     */
    formRef: FormInstance<User>,
}

export { ModifyModalProp, EditFormProp };
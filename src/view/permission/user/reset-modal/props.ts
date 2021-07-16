import { User } from "@/schema/user";

interface ResetModalProp {
    /**
     * 是否可见
     */
    visible: boolean;
    /**
     * 当前用户
     */
    data?: User;
    /**
     * 保存handle
     * @param id 用户id
     * @param newPassword 重置密码
     */
    onOk: (id: string, newPassword: string) => void;

    /**
     * 取消handle
     */
    onCancel: () => void;
}

interface FormValue {
    /**
     * 密码
     */
    password: string,
    /**
     * 重复密码
     */
    repassword: string
}

export { ResetModalProp, FormValue };
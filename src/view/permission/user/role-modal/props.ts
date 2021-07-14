import { User } from "@/schema/user";

export interface RoleModalProp {
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
	 * @param roleId 用户所选角色id
	 */
	onOk: (id: string, roleId: string[]) => void;

	/**
	 * 取消handle
	 */
	onCancel: () => void;
}

/**
 * 表单
 */
export interface FormValue {
	/**
	 * 所选角色id
	 */
	roles: string[];
}
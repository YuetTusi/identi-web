import { ResourceItem } from "@/model/app-menu";

const helper = {

    /**
     * 是否是null或undefined
     * @param value 任意值
     */
    isNullOrUndefined(value: any) {
        return Object.prototype.toString.call(value) === '[object Null]' || Object.prototype.toString.call(value) === '[object Undefined]';
    },
    /**
     * 验证传入路径是否存在于当菜单中
     * @param pathname 路径
     * @return {boolean} 是否可以访问
     */
    hasRoute(menu: ResourceItem[], pathname: string) {
        return JSON.stringify(menu).includes(pathname);
    }
};

export { helper };
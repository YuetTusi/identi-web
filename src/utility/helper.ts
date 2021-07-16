import { ResourceItem } from "@/model/app-menu";
import { DictCategory } from "@/schema/dict";
import { request } from "./request";

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
    },
    /**
     * 查询字典数据
     * @param category 字典分类
     */
    async getDict(category: DictCategory) {
        try {
            const { code, data } = await request<{ name: string, value: string }[]>({ url: `dict/${category}`, method: 'GET' });
            if (code === 0) {
                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }
};

export { helper };
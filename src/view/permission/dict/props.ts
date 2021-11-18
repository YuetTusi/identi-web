import { FormInstance } from "antd/lib/form";
import { Dict } from "@/schema/dict";

interface DictProp { };

interface EditModalProp {
    /**
     * 编辑id
     */
    id?: string,
    /**
     * 表单引用
     */
    formRef: FormInstance<Dict>,
    /**
     * 隐藏/显示
     */
    visible: boolean,
    /**
     * 保存handle
     */
    onOk: (data: Dict) => void,
    /**
     * 取消handle
     */
    onCancel: () => void
};

interface SearchFormProp {

    /**
     * 表单引用
     */
    formRef: FormInstance<{ category: string }>,

    /**
     * 表单提交
     */
    onSearchFormSubmit: (values: { category: string }) => void
};

interface EditFormValue {

    /**
     * 名称
     */
    name: string,
    /**
     * 值 
     */
    value: string,
    /**
     * 顺序
     */
    seq: number,
    /**
     * 分类
     */
    category: string
}

export { DictProp, SearchFormProp, EditModalProp, EditFormValue };
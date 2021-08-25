import { Resource } from "@/schema/resource";

interface EditSeqModalProp {

    /**
     * 显示
     */
    visible: boolean,
    /**
     * 数据
     */
    data: Resource,
    /**
     * 确定Click
     * @param id 资源id
     * @param seq 顺序
     */
    onOk: (id: string, seq: number) => void,
    /**
     * 取消Click
     */
    onCancel: () => void
}

interface FormValue {

    /**
     * 顺序
     */
    seq: number;
}

export { EditSeqModalProp, FormValue };
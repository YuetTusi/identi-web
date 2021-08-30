import { LawCase } from "@/schema/law-case";

interface ListProp {

    /**
     * 是否显示
     */
    visible: boolean,
    /**
     * 所属案件
     */
    lawCase: LawCase
}

/**
 * 分页数据
 */
interface Page {
    /**
     * 当前页
     */
    pageIndex: number,
    /**
     * 页尺寸
     */
    pageSize: number,
    /**
     * 总数
     */
    total: number
}

export { ListProp, Page };
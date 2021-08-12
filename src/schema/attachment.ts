import { BaseEntity } from "./base-entity";

/**
 * 附件
 */
class Attachment extends BaseEntity {

    /**
     * 案件id
     */
    case_id?: string;
    /**
     * 原文件名
     */
    file_name?: string;
    /**
     * 哈希值文件名
     */
    hash_name?: string;

    constructor() {
        super();
    }
}

export { Attachment };
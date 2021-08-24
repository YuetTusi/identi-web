import { BaseEntity } from "./base-entity";

/**
 * 状态标识
 */
enum ActionMessageState {

    /**
     * 未读
     */
    Unread,
    /**
     * 已读
     */
    Read
}

/**
 * 操作消息
 */
class ActionMessage extends BaseEntity {

    /**
     * 案件id
     */
    case_id?: string;

    /**
     * 用户id
     */
    user_id?: string;

    /**
     * 消息内容
     */
    content?: string;

    /**
     * 已读标识
     */
    read?: ActionMessageState;

    constructor() {
        super();
    }
}

export { ActionMessageState, ActionMessage }
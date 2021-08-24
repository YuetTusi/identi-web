import { ActionMessage, ActionMessageState } from "@/schema/action-message";

/**
 * 属性
 */
interface ActionMessageListProp {

    /**
     * 消息Click
     */
    onMessageClick: (data: ActionMessage) => void,
    /**
     * 全部已读Click
     */
    onReadAllClick: (userId: string) => void,
    /**
     * 去列表页Click
     */
    onDisplayClick: () => void
}

export { ActionMessageListProp };
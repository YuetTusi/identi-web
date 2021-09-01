import { Attachment } from "@/schema/attachment";

interface AttachmentTableProp {

    /**
     * 删除
     * @param data 附件
     */
    onDel: (data: Attachment) => void
}

export { AttachmentTableProp };
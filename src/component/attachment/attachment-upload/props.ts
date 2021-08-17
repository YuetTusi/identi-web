import { UploadChangeParam } from "antd/lib/upload";

/**
 * 属性
 */
interface AttachmentUploadProp {
    /**
     * 上传URL
     */
    action: string,
    /**
     * 是否多选
     */
    multiple?: boolean,
    /**
     * 附件Change回调
     */
    onChange: (info: UploadChangeParam) => void
}

export { AttachmentUploadProp };
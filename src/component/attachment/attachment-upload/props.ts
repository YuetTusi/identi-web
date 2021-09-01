import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";

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
    onChange: (info: UploadChangeParam) => void,
    /**
     * 删除回调
     */
    onRemove?: (file: UploadFile) => void
}

export { AttachmentUploadProp };
import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';
import { Attachment } from '@/schema/attachment';

interface AttachmentTableStoreState {
    /**
     * 加域中
     */
    loading: boolean,
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
    total: number,
    /**
     * 数据
     */
    data: Attachment[]
}

/**
 * 附件Modal
 */
let model: Model = {
    namespace: 'attachmentTable',
    state: {
        loading: false,
        pageIndex: 1,
        pageSize: 5,
        total: 0,
        data: []
    },
    reducers,
    effects
};

export { AttachmentTableStoreState }
export default model;
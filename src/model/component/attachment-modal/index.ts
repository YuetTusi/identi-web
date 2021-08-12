import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';
import { Attachment } from '@/schema/attachment';

interface AttachmentModalStoreState {
    /**
     * 是否可见
     */
    visible: boolean,
    /**
     * 加域中
     */
    loading: boolean,
    /**
     * 案件id
     */
    caseId: string,
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
    namespace: 'attachmentModal',
    state: {
        visible: false,
        loading: false,
        caseId: '',
        pageIndex: 1,
        pageSize: 5,
        total: 0,
        data: []
    },
    reducers,
    effects
};

export { AttachmentModalStoreState }
export default model;
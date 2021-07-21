import { StoreComponent } from "@/schema/model-type";
import { DisapproveModalStoreState } from "@/model/permission/component/disapprove-modal";
import { IssueModalStoreState } from "@/model/permission/component/issue-modal";

interface DisapproveModalProp extends StoreComponent {
    /**
     * 仓库State
     */
    disapproveModal: DisapproveModalStoreState
}

export { DisapproveModalProp };
import { IssueModalStoreState } from "@/model/permission/component/issue-modal";
import { StoreComponent } from "@/schema/model-type";

interface IssueModalProp extends StoreComponent {
    issueModal: IssueModalStoreState
}

export { IssueModalProp };
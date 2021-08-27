import { Dispatch } from "redux";
import { RouteComponentProps } from "dva/router";
import { AppMenuStoreState } from "@/model/app-menu";
import { AuthStoreState } from "@/model/auth";
import { DefaultStoreState } from "@/model/default";
import { DisapproveModalStoreState } from "@/model/permission/component/disapprove-modal";
import { IssueModalStoreState } from "@/model/permission/component/issue-modal";
import { ReissueModalStoreState } from "@/model/permission/component/reissue-modal";
import { LawCaseStoreState } from "@/model/permission/law-case";
import { ResourceStoreState } from "@/model/permission/resource";
import { RoleStoreState } from "@/model/permission/role";
import { UserStoreState } from "@/model/permission/user";
import { SettingStoreState } from "@/model/profile/setting";
import { AttachmentModalStoreState } from "@/model/component/attachment-modal";
import { ActionMessageListStoreState } from "@/model/component/action-message-list";
import { MessageStoreState } from '@/model/message';
import { DeviceStoreState } from '@/model/device';

/**
 * 经DvaConnect注入的组件
 */
interface StoreComponent<MatchParam = any> extends RouteComponentProps<MatchParam> {
    /**
     * Dispatcher方法
     */
    dispatch: Dispatch<any>;
}

/**
 * 状态树
 */
interface StateTree {
    attachmentModal: AttachmentModalStoreState,
    actionMessageList: ActionMessageListStoreState,
    appMenu: AppMenuStoreState,
    auth: AuthStoreState,
    default: DefaultStoreState,
    disapproveModal: DisapproveModalStoreState,
    issueModal: IssueModalStoreState,
    reissueModal: ReissueModalStoreState,
    lawCase: LawCaseStoreState,
    resource: ResourceStoreState,
    role: RoleStoreState,
    user: UserStoreState,
    setting: SettingStoreState,
    message: MessageStoreState,
    device: DeviceStoreState,
    [modelName: string]: any
}

export { StoreComponent, StateTree };
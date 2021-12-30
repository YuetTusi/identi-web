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
import { DictStoreState } from '@/model/permission/dict';
import { RoleStoreState } from "@/model/permission/role";
import { UserStoreState } from "@/model/permission/user";
import { SettingStoreState } from "@/model/profile/setting";
import { AttachmentModalStoreState } from "@/model/component/attachment-modal";
import { AttachmentTableStoreState } from "@/model/component/attachment-table";
import { ActionMessageListStoreState } from "@/model/component/action-message-list";
import { MessageStoreState } from '@/model/message';

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
    /**
     * 附件弹框Model
     */
    attachmentModal: AttachmentModalStoreState,
    /**
     * 附件列表Model
     */
    attachmentTablel: AttachmentTableStoreState,
    /**
     * 消息Model
     */
    actionMessageList: ActionMessageListStoreState,
    /**
     * 菜单Model
     */
    appMenu: AppMenuStoreState,
    /**
     * 鉴权Model
     */
    auth: AuthStoreState,
    /**
     * 案件Model
     */
    default: DefaultStoreState,
    /**
     * 审核Model
     */
    disapproveModal: DisapproveModalStoreState,
    /**
     * 下发鉴定Model
     */
    issueModal: IssueModalStoreState,
    /**
     * 重新鉴定Model
     */
    reissueModal: ReissueModalStoreState,
    /**
     * 案件管理Model
     */
    lawCase: LawCaseStoreState,
    /**
     * 资源查看Model
     */
    resource: ResourceStoreState,
    /**
     * 字典Model
     */
    dict: DictStoreState,
    /**
     * 角色Model
     */
    role: RoleStoreState,
    /**
     * 用户Model
     */
    user: UserStoreState,
    /**
     * 个人设置Model
     */
    setting: SettingStoreState,
    /**
     * 消息Model
     */
    message: MessageStoreState,
    /**
     * DvaModel
     */
    [modelName: string]: any
}

export { StoreComponent, StateTree };
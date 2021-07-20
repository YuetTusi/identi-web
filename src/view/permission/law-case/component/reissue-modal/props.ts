import { ReissueModalStoreState } from "@/model/permission/component/reissue-modal";
import { StoreComponent } from "@/schema/model-type";

interface ReissueModalProp extends StoreComponent {
    /**
     * 仓库state
     */
    reissueModal: ReissueModalStoreState
}

export { ReissueModalProp };
import { StoreComponent } from "@/schema/model-type";
import { SettingStoreState } from "@/model/profile/setting";

interface SettingProp extends StoreComponent {

    /**
     * 仓库
     */
    setting: SettingStoreState;
}

export { SettingProp };
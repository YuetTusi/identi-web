import { AppMenuStoreState } from "@/model/app-menu";
import { StoreComponent } from "@/schema/model-type";

interface RootPanelProp extends StoreComponent {
    /**
     * AppMenuStore
     */
    appMenu: AppMenuStoreState
}
export { RootPanelProp };
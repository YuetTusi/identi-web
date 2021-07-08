import { RoleStoreState } from "@/model/permission/role";
import { StoreComponent } from "@/schema/model-type";

interface Prop extends StoreComponent {
    /**
     * 角色StoreState
     */
    role: RoleStoreState
}

export { Prop }
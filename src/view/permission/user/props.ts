import { UserStoreState } from "@/model/permission/user";
import { StoreComponent } from "@/schema/model-type";

interface Prop extends StoreComponent {
    user: UserStoreState
}

export { Prop };
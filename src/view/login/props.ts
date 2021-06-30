import { AuthStoreState } from "@/model/auth";
import { StoreComponent } from "@/schema/model-type";

interface LoginProp extends StoreComponent {

    auth: AuthStoreState;
}

export { LoginProp };
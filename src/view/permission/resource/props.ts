import { ResourceStoreState } from "@/model/permission/resource";
import { StoreComponent } from "@/schema/model-type";

/**
 * 属性
 */
interface Prop extends StoreComponent {
    /**
     * Resource仓库State
     */
    resource: ResourceStoreState;
}

export { Prop };
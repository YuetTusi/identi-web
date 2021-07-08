import { Model, DvaInstance } from "dva";

interface ModelCache {
    [name: string]: number
}

//已经注册model
const modelCache: ModelCache = {};

/**
 * @description 手动注册dva模型
 * @param app dva实例
 * @param model 模型对象
 */
function registerModel(app: DvaInstance, model: Model) {
    if (!modelCache[model.namespace]) {
        app.model(model);
        modelCache[model.namespace] = 1;
    }
}

export { registerModel };



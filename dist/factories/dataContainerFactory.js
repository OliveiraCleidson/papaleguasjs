"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataContainerFactory = void 0;
const appConfig_1 = require("../config/appConfig");
class DataContainerFactory {
    static createDataContainer() {
        const dataContainer = {};
        dataContainer.dbName = appConfig_1.APP_CONFIG.database.name;
        return dataContainer;
    }
}
exports.DataContainerFactory = DataContainerFactory;
//# sourceMappingURL=dataContainerFactory.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionFactory = void 0;
const mssql_1 = __importDefault(require("mssql"));
const appConfig_1 = require("../config/appConfig");
class ConnectionFactory {
    static async createSqlServerConnection() {
        const connection = await mssql_1.default.connect(appConfig_1.APP_CONFIG.database.connectionString);
        return connection;
    }
}
exports.ConnectionFactory = ConnectionFactory;
//# sourceMappingURL=connectionFactory.js.map
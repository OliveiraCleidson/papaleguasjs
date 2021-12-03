"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionsFactory = void 0;
const GetTablesAction_1 = require("../actions/GetTablesAction");
class ActionsFactory {
    static createGetTablesAction(connection) {
        return new GetTablesAction_1.GetTablesAction(connection);
    }
}
exports.ActionsFactory = ActionsFactory;
//# sourceMappingURL=actionsFactory.js.map
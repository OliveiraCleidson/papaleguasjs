"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextFactory = void 0;
const contexts_1 = require("../contexts");
class ContextFactory {
    static createAppContext(dataContainer, logger, strategy = null) {
        return new contexts_1.AppContext(dataContainer, logger, strategy);
    }
}
exports.ContextFactory = ContextFactory;
//# sourceMappingURL=contextFactory.js.map
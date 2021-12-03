"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleCrudStrategyFactory = void 0;
const generateContentAction_1 = require("../actions/byStrategy/simpleCrud/generateContentAction");
const simpleCrudStrategyFactory = (strategyBuilder) => {
    strategyBuilder.addAction(new generateContentAction_1.GenerateContentAction());
    return strategyBuilder.build();
};
exports.simpleCrudStrategyFactory = simpleCrudStrategyFactory;
//# sourceMappingURL=simpleCrudStrategy.js.map
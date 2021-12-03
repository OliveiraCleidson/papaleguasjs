"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyBuilder = void 0;
const Action_1 = require("../actions/Action");
const Queue_1 = require("../structs/Queue");
class StrategyBuilder {
    constructor(name, initialInputData = []) {
        this.name = name;
        this._process = [];
        this._inputData = initialInputData || [];
        this._strategy = {
            process: new Queue_1.Queue(),
        };
    }
    addAction(action) {
        this._process.push(action);
    }
    addPrompt(prompt) {
        this._process.push(prompt);
    }
    build() {
        while (this._process.length !== 0) {
            const process = this._process.shift();
            if (process instanceof Action_1.Action) {
                const data = process.inputData.filter(e => !this._inputData.includes(e));
                if (data.length !== 0) {
                    throw new Error(`Insuficient data to action ${process.name} in ${this.name} strategy: ${data}`);
                }
            }
            this._inputData = [...this._inputData, ...process.outputData];
            this._strategy.process.enqueue(process);
        }
        console.log(`${this.name} build success`);
        return this._strategy;
    }
}
exports.StrategyBuilder = StrategyBuilder;
//# sourceMappingURL=strategyBuilder.js.map
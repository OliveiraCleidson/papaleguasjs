"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContext = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const Action_1 = require("../actions/Action");
class AppContext {
    constructor(_dataContainer, _logger, _strategy = null) {
        this._dataContainer = _dataContainer;
        this._logger = _logger;
        this._strategy = _strategy;
    }
    async execute() {
        if (this._strategy == null) {
            throw new Error('Missing strategy in AppContext');
        }
        while (!this._strategy.process.isEmpty()) {
            const process = this._strategy.process.dequeue();
            try {
                if (process instanceof Action_1.Action) {
                    this._logger.log({
                        level: 'info',
                        message: `${AppContext.name} - Executing action: ${process.name}`,
                    });
                    await process.execute(this._dataContainer);
                    this._logger.log({
                        level: 'info',
                        message: `${AppContext.name} - Action OK`,
                    });
                }
                else {
                    this._logger.log({
                        level: 'info',
                        message: `${AppContext.name} - Executing prompt ${process.name}`,
                    });
                    const data = await inquirer_1.default.prompt(process.prompt);
                    this._logger.log({
                        level: 'info',
                        message: `${AppContext.name} - Prompt OK`,
                    });
                    this._dataContainer = { ...this._dataContainer, ...data };
                }
            }
            catch (err) {
                const error = err;
                this._logger.log({
                    level: 'error',
                    message: error.message,
                });
                console.log('Ocorreu um erro');
            }
        }
    }
}
exports.AppContext = AppContext;
//# sourceMappingURL=AppContext.js.map
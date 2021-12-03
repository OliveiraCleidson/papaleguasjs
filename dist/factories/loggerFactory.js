"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = void 0;
const path_1 = require("path");
const winston_1 = __importDefault(require("winston"));
class LoggerFactory {
    static createWinstonLogger() {
        const logPath = (0, path_1.resolve)(__dirname, '..', 'logs');
        const timestamp = new Date().toISOString();
        const logger = winston_1.default.createLogger({
            level: 'info',
            format: winston_1.default.format.json(),
            defaultMeta: { service: 'automation-cli' },
            transports: [
                new winston_1.default.transports.File({
                    dirname: logPath,
                    filename: `errors-${timestamp}.log`,
                    level: 'error',
                }),
                new winston_1.default.transports.File({
                    dirname: logPath,
                    filename: `all-${timestamp}.log`,
                }),
            ],
        });
        return logger;
    }
}
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=loggerFactory.js.map
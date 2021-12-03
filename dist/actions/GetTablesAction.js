"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTablesAction = void 0;
const pascal_case_1 = require("pascal-case");
const inquirer_1 = __importDefault(require("inquirer"));
const pluralize_1 = __importDefault(require("pluralize"));
const models_1 = require("../models");
const queries_1 = require("../queries");
const _1 = require(".");
class GetTablesAction extends _1.Action {
    constructor(connection) {
        super();
        this._connection = connection;
        this.name = 'TableAction';
        this.inputData = ['dbName'];
        this.outputData = ['tables', 'projectPath'];
    }
    async execute(dataContainer) {
        const tablesResult = await this._connection.query((0, queries_1.getTablesByDbQuery)(dataContainer.dbName));
        const tables = tablesResult.recordset;
        let tableNames = [];
        const { projectPath } = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'projectPath',
                message: 'Insira o Path do Projeto',
            },
        ]);
        dataContainer.projectPath = projectPath;
        while (tableNames.length <= 0) {
            const { tableNamesPrompt } = await inquirer_1.default.prompt([
                {
                    type: 'checkbox',
                    name: 'tableNamesPrompt',
                    message: 'Selecione as tabelas',
                    choices: tables.map(t => t.name).sort((a, b) => a.localeCompare(b)),
                },
            ]);
            tableNames = tableNamesPrompt || [];
        }
        const result = [];
        for await (const tableName of tableNames) {
            const columnsResult = await this._connection.query((0, queries_1.getColumnsByTableQuery)(tableName));
            const columns = columnsResult.recordset.map(column => {
                return { ...column, displayName: (0, pascal_case_1.pascalCase)(column.name) };
            });
            const displayName = (0, pascal_case_1.pascalCase)(tableName);
            const displayNamePlural = (0, pluralize_1.default)(displayName);
            result.push(new models_1.Table(tableName, {
                singular: displayName,
                plural: displayNamePlural,
            }, columns));
        }
        dataContainer.tables = result;
        return dataContainer;
    }
}
exports.GetTablesAction = GetTablesAction;
//# sourceMappingURL=GetTablesAction.js.map
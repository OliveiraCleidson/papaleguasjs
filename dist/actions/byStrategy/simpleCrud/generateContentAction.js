"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateContentAction = void 0;
/* eslint-disable no-restricted-syntax */
const camel_case_1 = require("camel-case");
const param_case_1 = require("param-case");
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const actions_1 = require("../../../actions");
const simpleCrud_1 = require("../../../fileTemplates/byStrategy/simpleCrud");
const createDtoTemplate_1 = require("../../../fileTemplates/byStrategy/simpleCrud/createDtoTemplate");
const filterDtoTemplate_1 = require("../../../fileTemplates/byStrategy/simpleCrud/filterDtoTemplate");
const updateDtoTemplate_1 = require("../../../fileTemplates/byStrategy/simpleCrud/updateDtoTemplate");
const viewModelTemplate_1 = require("../../../fileTemplates/byStrategy/simpleCrud/viewModelTemplate");
const propertyService_1 = require("../../../services/propertyService");
class GenerateContentAction extends actions_1.Action {
    constructor() {
        super();
        this.name = 'GenerateContentAction';
        this.inputData = ['tables', 'projectPath'];
        this.outputData = [
        // 'viewContent',
        // 'updateDtoContent',
        // 'createDtoContent',
        // 'controllerContent',
        // 'filterDtoContent',
        ];
    }
    execute(dataContainer) {
        const { tables, projectPath } = dataContainer;
        for (const table of tables) {
            const props = propertyService_1.PropertyService.c_generatePropsByColumns(table.columns);
            const viewContent = (0, viewModelTemplate_1.viewModelTemplate)({
                props,
                modelName: table.displayName.singular,
            });
            const updateDtoContent = (0, updateDtoTemplate_1.updateDtoTemplate)({
                props,
                modelName: table.displayName.singular,
            });
            const createDtoContent = (0, createDtoTemplate_1.createDtoTemplate)({
                props,
                modelName: table.displayName.singular,
            });
            const filterDtoContent = (0, filterDtoTemplate_1.filterDtoTemplate)({
                props,
                modelName: table.displayName.singular,
            });
            const controllerContent = (0, simpleCrud_1.controllerTemplate)({
                modelName: table.displayName.singular,
                plural: (0, camel_case_1.camelCase)(table.displayName.plural),
                controllerName: (0, param_case_1.paramCase)(table.displayName.plural),
            });
            fs_1.default.promises.writeFile((0, path_1.resolve)(projectPath, 'ViewModels', `${table.displayName.singular}ViewModel.cs`), viewContent, 'utf-8');
            fs_1.default.promises.writeFile((0, path_1.resolve)(projectPath, 'Dtos', 'Filters', `${table.displayName.singular}FilterDto.cs`), filterDtoContent, 'utf-8');
            fs_1.default.promises.writeFile((0, path_1.resolve)(projectPath, 'Dtos', 'Create', `Create${table.displayName.singular}Dto.cs`), createDtoContent, 'utf-8');
            fs_1.default.promises.writeFile((0, path_1.resolve)(projectPath, 'Dtos', 'Update', `Update${table.displayName.singular}Dto.cs`), updateDtoContent, 'utf-8');
            fs_1.default.promises.writeFile((0, path_1.resolve)(projectPath, 'Controllers', `${table.displayName.singular}Controller.cs`), controllerContent, 'utf-8');
        }
        return Promise.resolve(dataContainer);
    }
}
exports.GenerateContentAction = GenerateContentAction;
//# sourceMappingURL=generateContentAction.js.map
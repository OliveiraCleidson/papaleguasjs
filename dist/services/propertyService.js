"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
/* eslint-disable no-restricted-syntax */
const camel_case_1 = require("camel-case");
const pascal_case_1 = require("pascal-case");
const languageTypes_1 = require("../libs/languageTypes");
class PropertyService {
    static c_generate({ displayName: name, isNullable = true, dataType: type }, isPrivate = false) {
        const cType = languageTypes_1.LANGUAGE_TYPES.find(t => t.sql.toLocaleLowerCase() === type.toLocaleLowerCase());
        if (!cType) {
            throw new Error(`O tipo ${type} não está registrado no script`);
        }
        if (isPrivate) {
            return `private ${cType.c[isNullable ? 'nullable' : 'normal']} _${(0, camel_case_1.camelCase)(name)};
    public ${cType.c[isNullable ? 'nullable' : 'normal']} ${(0, pascal_case_1.pascalCase)(name)}
    {
        get { return _${(0, camel_case_1.camelCase)(name)}; }
        set { _${(0, camel_case_1.camelCase)(name)} = value; }
    }\n    `;
        }
        return `public ${cType.c[isNullable ? 'nullable' : 'normal']} ${(0, pascal_case_1.pascalCase)(name)} { get; set; }\n        `;
    }
    static c_generateConstructorPropsGenerator(column) {
        return `this.${column.displayName} = ${(0, camel_case_1.camelCase)(column.displayName)};
    `;
    }
    static c_constructorParamsGenerator(column) {
        return `${(0, camel_case_1.camelCase)(column.displayName)},`;
    }
    static c_constructorViewParamsGenerator(modelName) {
        return `${modelName} model`;
    }
    static c_constructorViewPropsGenerator(column) {
        return `this.${column.displayName} = model.${column.displayName};
      `;
    }
    static c_generatePropsByColumns(columns) {
        let classBody = '';
        for (const column of columns) {
            classBody += `${PropertyService.c_generate(column)}`;
        }
        return classBody;
    }
}
exports.PropertyService = PropertyService;
//# sourceMappingURL=propertyService.js.map
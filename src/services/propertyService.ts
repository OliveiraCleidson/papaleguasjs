/* eslint-disable no-restricted-syntax */
import { camelCase } from 'camel-case';
import { pascalCase } from 'pascal-case';
import { Column } from '@/models/column';
import { LANGUAGE_TYPES } from '@/libs/languageTypes';

export class PropertyService {
  static c_generate(
    { displayName: name, isNullable = true, dataType: type }: Column,
    isPrivate = false,
  ) {
    const cType = LANGUAGE_TYPES.find(
      t => t.sql.toLocaleLowerCase() === type.toLocaleLowerCase(),
    );
    if (!cType) {
      throw new Error(`O tipo ${type} não está registrado no script`);
    }

    if (isPrivate) {
      return `private ${
        cType.c[isNullable ? 'nullable' : 'normal']
      } _${camelCase(name)};
    public ${cType.c[isNullable ? 'nullable' : 'normal']} ${pascalCase(name)}
    {
        get { return _${camelCase(name)}; }
        set { _${camelCase(name)} = value; }
    }\n    `;
    }

    return `public ${cType.c[isNullable ? 'nullable' : 'normal']} ${pascalCase(
      name,
    )} { get; set; }\n        `;
  }

  static c_generateConstructorPropsGenerator(column: Column) {
    return `this.${column.displayName} = ${camelCase(column.displayName)};
    `;
  }

  static c_constructorParamsGenerator(column: Column) {
    return `${camelCase(column.displayName)},`;
  }

  static c_constructorViewParamsGenerator(modelName: string) {
    return `${modelName} model`;
  }

  static c_constructorViewPropsGenerator(column: Column) {
    return `this.${column.displayName} = model.${column.displayName};
      `;
  }

  static c_generatePropsByColumns(columns: Column[]): string {
    let classBody = '';
    for (const column of columns) {
      classBody += `${PropertyService.c_generate(column)}`;
    }

    return classBody;
  }
}

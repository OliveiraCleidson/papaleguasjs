/* eslint-disable no-restricted-syntax */
import { camelCase } from 'camel-case';
import { paramCase } from 'param-case';
import { resolve } from 'path';
import fs from 'fs';
import { DataContainer } from '@/@types';
import { Action } from '@/actions';
import { controllerTemplate } from '@/fileTemplates/byStrategy/simpleCrud';
import { createDtoTemplate } from '@/fileTemplates/byStrategy/simpleCrud/createDtoTemplate';
import { filterDtoTemplate } from '@/fileTemplates/byStrategy/simpleCrud/filterDtoTemplate';
import { updateDtoTemplate } from '@/fileTemplates/byStrategy/simpleCrud/updateDtoTemplate';
import { viewModelTemplate } from '@/fileTemplates/byStrategy/simpleCrud/viewModelTemplate';
import { ITable } from '@/models';
import { PropertyService } from '@/services/propertyService';

export class GenerateContentAction extends Action {
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

  execute(dataContainer: DataContainer): Promise<DataContainer> {
    const { tables, projectPath } = dataContainer;

    for (const table of tables as unknown as ITable[]) {
      const props = PropertyService.c_generatePropsByColumns(table.columns);

      const viewContent = viewModelTemplate({
        props,
        modelName: table.displayName.singular,
      });
      const updateDtoContent = updateDtoTemplate({
        props,
        modelName: table.displayName.singular,
      });
      const createDtoContent = createDtoTemplate({
        props,
        modelName: table.displayName.singular,
      });
      const filterDtoContent = filterDtoTemplate({
        props,
        modelName: table.displayName.singular,
      });

      const controllerContent = controllerTemplate({
        modelName: table.displayName.singular,
        plural: camelCase(table.displayName.plural),
        controllerName: paramCase(table.displayName.plural),
      });

      fs.promises.writeFile(
        resolve(
          projectPath as string,
          'ViewModels',
          `${table.displayName.singular}ViewModel.cs`,
        ),
        viewContent as string,
        'utf-8',
      );

      fs.promises.writeFile(
        resolve(
          projectPath as string,
          'Dtos',
          'Filters',
          `${table.displayName.singular}FilterDto.cs`,
        ),
        filterDtoContent as string,
        'utf-8',
      );

      fs.promises.writeFile(
        resolve(
          projectPath as string,
          'Dtos',
          'Create',
          `Create${table.displayName.singular}Dto.cs`,
        ),
        createDtoContent as string,
        'utf-8',
      );

      fs.promises.writeFile(
        resolve(
          projectPath as string,
          'Dtos',
          'Update',
          `Update${table.displayName.singular}Dto.cs`,
        ),
        updateDtoContent as string,
        'utf-8',
      );

      fs.promises.writeFile(
        resolve(
          projectPath as string,
          'Controllers',
          `${table.displayName.singular}Controller.cs`,
        ),
        controllerContent as string,
        'utf-8',
      );
    }

    return Promise.resolve(dataContainer);
  }
}

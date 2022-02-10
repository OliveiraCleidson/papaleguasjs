/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import { camelCase } from 'camel-case';
import { paramCase } from 'param-case';
import { resolve } from 'path';
import { DataContainer } from '@/@types';
import { Action } from '@/actions';
import { controllerTemplate } from '../fileTemplates';
import { createDtoTemplate } from '../fileTemplates/createDtoTemplate';
import { filterDtoTemplate } from '../fileTemplates/filterDtoTemplate';
import { updateDtoTemplate } from '../fileTemplates/updateDtoTemplate';
import { viewModelTemplate } from '../fileTemplates/viewModelTemplate';
import { ITable } from '@/models';
import { PropertyService } from '@/services/propertyService';

export class GenerateContentAction extends Action {
  constructor() {
    super();
    this.name = 'GenerateContentAction';
    this.inputData = ['tables', 'projectPath'];
    this.outputData = [
      'viewContent',
      'updateDtoContent',
      'createDtoContent',
      'controllerContent',
      'filterDtoContent',
    ];
  }

  execute(dataContainer: DataContainer): Promise<DataContainer> {
    const { tables, projectPath } = dataContainer;

    for (const table of tables as unknown as ITable[]) {
      const ignoredProps = ['ExcludedGuid'];
      let props = PropertyService.c_generatePropsByColumns(
        table.columns.filter(c => !ignoredProps.includes(c.displayName)),
      );

      const viewContent = viewModelTemplate({
        props,
        modelName: table.displayName.singular,
      });

      ignoredProps.push(table.columns.find(c => c.isIdentity).displayName);
      props = PropertyService.c_generatePropsByColumns(
        table.columns.filter(c => !ignoredProps.includes(c.displayName)),
      );

      const filterDtoContent = filterDtoTemplate({
        props,
        modelName: table.displayName.singular,
      });

      // ignoredProps.push(
      //   ...['DtCreatedAt', 'DtUpdatedAt', 'CreatedBy', 'UpdatedBy'],
      // );
      props = PropertyService.c_generatePropsByColumns(
        table.columns.filter(c => !ignoredProps.includes(c.displayName)),
      );

      const updateDtoContent = updateDtoTemplate({
        props,
        modelName: table.displayName.singular,
      });
      const createDtoContent = createDtoTemplate({
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

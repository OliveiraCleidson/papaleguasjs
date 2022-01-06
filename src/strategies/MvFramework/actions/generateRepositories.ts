/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import { resolve } from 'path';
import { DataContainer } from '@/@types';
import { Action } from '@/actions';
import { domainRepositoryTemplate } from '../fileTemplates/domainRepository';
import { infraRepositoryTemplate } from '../fileTemplates/infraRepository';
import { ITable } from '@/models';

export class GenerateRepositoriesAction extends Action {
  constructor() {
    super();
    this.name = 'GenerateRepositoriesAction';
    this.inputData = ['tables', 'projectPath'];
  }

  async execute(dataContainer: DataContainer): Promise<DataContainer> {
    const { tables, projectPath } = dataContainer;
    /**
     *
     */

    for (const table of tables as unknown as ITable[]) {
      const info = {
        modelName: table.displayName.singular,
        domain: 'Adm',
        table,
      };

      const domainContent = domainRepositoryTemplate(info);
      const infraContent = infraRepositoryTemplate(info);

      const infraPath = resolve(
        projectPath as string,
        'Domain.Infra',
        'Adm',
        'Repositories',
        `${info.modelName}Repository.cs`,
      );
      const domainPath = resolve(
        projectPath as string,
        'Domain',
        'Adm',
        'Repositories',
        `I${info.modelName}Repository.cs`,
      ); /*
      const infraExists = fs.existsSync(infraPath);
      if (!infraExists)
        await fs.promises.writeFile(infraPath, infraContent as string, 'utf-8'); */

      const domainExists = fs.existsSync(domainPath);
      if (!domainExists)
        await fs.promises.writeFile(
          domainPath,
          domainContent as string,
          'utf-8',
        );
    }

    return dataContainer;
  }
}

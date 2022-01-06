/* eslint-disable no-restricted-syntax */
import { ConnectionPool } from 'mssql';
import { pascalCase } from 'pascal-case';
import inquirer from 'inquirer';
import pluralize from 'pluralize';
import { DataContainer } from '@/@types';
import { ITable, Table, Column } from '@/models';
import { getTablesByDbQuery, getColumnsByTableQuery } from '@/queries';
import { Action } from '.';

export class GetTablesAction extends Action {
  private _connection: ConnectionPool;

  constructor() {
    super();
    this.name = 'GetTablesAction';
    this.inputData = [];
    this.outputData = ['tables', 'projectPath'];
  }

  async execute(dataContainer: DataContainer): Promise<DataContainer> {
    this._connection = dataContainer.connection as ConnectionPool;

    const tablesResult = await this._connection.query<Table>(
      getTablesByDbQuery('dev'),
    );

    const tables = tablesResult.recordset;
    let tableNames = [];
    const { projectPath } = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectPath',
        message: 'Insira o Path do Projeto',
      },
    ]);

    dataContainer.projectPath = projectPath;

    while (tableNames.length <= 0) {
      const { tableNamesPrompt }: { tableNamesPrompt: string[] } =
        await inquirer.prompt([
          {
            type: 'checkbox',
            name: 'tableNamesPrompt',
            message: 'Selecione as tabelas',
            choices: tables.map(t => t.name).sort((a, b) => a.localeCompare(b)),
          },
        ]);

      tableNames = tableNamesPrompt || [];
    }

    const result: ITable[] = [];
    for await (const tableName of tableNames) {
      const columnsResult = await this._connection.query<Column>(
        getColumnsByTableQuery(tableName),
      );
      const columns = columnsResult.recordset.map(column => {
        return { ...column, displayName: pascalCase(column.name) };
      });

      const displayName = pascalCase(tableName);

      const displayNamePlural = pluralize(displayName);

      result.push(
        new Table(
          tableName,
          {
            singular: displayName,
            plural: displayNamePlural,
          },
          columns,
        ),
      );
    }

    dataContainer.tables = result;
    return dataContainer;
  }
}

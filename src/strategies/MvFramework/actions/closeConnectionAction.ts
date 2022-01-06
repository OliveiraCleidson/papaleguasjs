import { ConnectionPool } from 'mssql';
import { DataContainer } from '@/@types';
import { Action } from '@/actions';

export class CloseConnectionAction extends Action {
  constructor() {
    super();
    this.name = 'CloseConnectionAction';
    this.inputData = ['connection'];
    this.outputData = [];
  }

  async execute(dataContainer: DataContainer): Promise<DataContainer> {
    const connection = dataContainer.connection as ConnectionPool;
    await connection.close();

    return dataContainer;
  }
}

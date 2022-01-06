import { DataContainer } from '@/@types';
import { Action } from '@/actions';
import { ConnectionFactory } from '@/factories';

export class GetConnectionAction extends Action {
  constructor() {
    super();
    this.name = 'GetConnectionAction';
    this.inputData = [];
    this.outputData = ['connection'];
  }

  async execute(dataContainer: DataContainer): Promise<DataContainer> {
    const connection = await ConnectionFactory.createSqlServerConnection();
    dataContainer.connection = connection;

    return dataContainer;
  }
}

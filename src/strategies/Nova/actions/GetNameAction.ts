import { DataContainer } from '@/@types';
import { Action } from '@/actions';

export class GetNameAction extends Action {
  constructor() {
    super();
    this.name = 'GetNameAction';
    this.inputData = [];
    this.outputData = ['valor'];
  }

  execute(dataContainer: DataContainer): Promise<DataContainer> {
    const { name } = dataContainer;

    dataContainer.valor = '';

    return Promise.resolve(dataContainer);
  }
}

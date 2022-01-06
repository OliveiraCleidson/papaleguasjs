import { DataContainer } from '@/@types';
import { Action } from '@/actions';

export class GetNameAction extends Action {
  constructor() {
    super();
    this.name = 'GetNameAction';
    this.inputData = [];
    this.outputData = ['name'];
  }

  execute(dataContainer: DataContainer): Promise<DataContainer> {
    throw new Error('Method not implemented.');
  }
}

import { DataContainer } from '@/@types';
import { Action } from '@/actions';

export class GenerateCommandsAction extends Action {
  constructor() {
    super();
    this.name = 'GenerateCommandsAction';
    this.inputData = [];
    this.outputData = [];
  }

  async execute(dataContainer: DataContainer): Promise<DataContainer> {
    throw new Error('Method not implemented.');
  }
}

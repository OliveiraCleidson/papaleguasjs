import { DataContainer } from '@/@types';

export abstract class Action {
  constructor() {
    this.name = '';
    this.inputData = [];
    this.outputData = [];
  }

  name: string;

  inputData: string[];

  outputData: string[];

  abstract execute(dataContainer: DataContainer): Promise<DataContainer>;
}

import { Gender } from '@/enums/gender';
import { Column } from './column';

export interface ITable {
  name: string;
  displayName: {
    singular: string;
    plural: string;
    gender?: Gender;
  };
  columns: Column[];
}

export class Table implements ITable {
  constructor(
    public name: string,
    public displayName: { singular: string; plural: string; gender?: Gender },
    public columns: Column[],
  ) {}
}

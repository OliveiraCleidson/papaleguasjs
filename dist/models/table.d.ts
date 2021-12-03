import { Gender } from '../enums/gender';
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
export declare class Table implements ITable {
    name: string;
    displayName: {
        singular: string;
        plural: string;
        gender?: Gender;
    };
    columns: Column[];
    constructor(name: string, displayName: {
        singular: string;
        plural: string;
        gender?: Gender;
    }, columns: Column[]);
}

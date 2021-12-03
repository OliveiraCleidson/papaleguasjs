import { DataContainer } from '../@types';
export declare abstract class Action {
    constructor();
    name: string;
    inputData: string[];
    outputData: string[];
    abstract execute(dataContainer: DataContainer): Promise<DataContainer>;
}

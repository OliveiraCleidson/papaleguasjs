import { DataContainer } from '../../../@types';
import { Action } from '../../../actions';
export declare class GenerateContentAction extends Action {
    constructor();
    execute(dataContainer: DataContainer): Promise<DataContainer>;
}

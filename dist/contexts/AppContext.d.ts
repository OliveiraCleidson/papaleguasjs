import { Logger } from 'winston';
import { DataContainer } from '../@types';
import { IStrategy } from '../strategies/IStrategy';
export declare class AppContext {
    private _dataContainer;
    private readonly _logger;
    _strategy: IStrategy;
    constructor(_dataContainer: DataContainer, _logger: Logger, _strategy?: IStrategy);
    execute(): Promise<void>;
}

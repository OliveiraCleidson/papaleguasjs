import { Logger } from 'winston';
import { DataContainer } from '../@types';
import { AppContext } from '../contexts';
import { IStrategy } from '../strategies';
export declare class ContextFactory {
    static createAppContext(dataContainer: DataContainer, logger: Logger, strategy?: IStrategy): AppContext;
}

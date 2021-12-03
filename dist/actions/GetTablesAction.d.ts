import { ConnectionPool } from 'mssql';
import { DataContainer } from '../@types';
import { Action } from '.';
export declare class GetTablesAction extends Action {
    private readonly _connection;
    constructor(connection: ConnectionPool);
    execute(dataContainer: DataContainer): Promise<DataContainer>;
}

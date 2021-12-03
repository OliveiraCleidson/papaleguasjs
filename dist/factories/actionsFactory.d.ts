import { ConnectionPool } from 'mssql';
import { GetTablesAction } from '../actions/GetTablesAction';
export declare class ActionsFactory {
    static createGetTablesAction(connection: ConnectionPool): GetTablesAction;
}

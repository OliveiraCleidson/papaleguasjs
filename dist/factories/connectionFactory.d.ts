import mssql from 'mssql';
export declare class ConnectionFactory {
    static createSqlServerConnection(): Promise<mssql.ConnectionPool>;
}

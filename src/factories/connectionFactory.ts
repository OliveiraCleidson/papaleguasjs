import mssql from 'mssql';
import { APP_CONFIG } from '@/config/appConfig';

export class ConnectionFactory {
  static async createSqlServerConnection() {
    const connection = await mssql.connect(
      APP_CONFIG.database.connectionString,
    );
    return connection;
  }
}

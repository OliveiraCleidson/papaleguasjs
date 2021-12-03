import { ConnectionPool } from 'mssql';
import { PromptModule } from 'inquirer';
import { GetTablesAction } from '@/actions/GetTablesAction';

export class ActionsFactory {
  static createGetTablesAction(connection: ConnectionPool) {
    return new GetTablesAction(connection);
  }
}

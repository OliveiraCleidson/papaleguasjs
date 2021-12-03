import { Logger } from 'winston';
import { DataContainer } from '@/@types';
import { AppContext } from '@/contexts';
import { IStrategy } from '@/strategies';

export class ContextFactory {
  static createAppContext(
    dataContainer: DataContainer,
    logger: Logger,
    strategy: IStrategy = null,
  ) {
    return new AppContext(dataContainer, logger, strategy);
  }
}

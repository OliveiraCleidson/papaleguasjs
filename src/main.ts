#!/usr/bin/env node

import 'dotenv/config';
import { StrategyBuilder } from './builders';
import { ActionsFactory, ConnectionFactory } from './factories';
import { ContextFactory } from './factories/contextFactory';
import { DataContainerFactory } from './factories/dataContainerFactory';
import { LoggerFactory } from './factories/loggerFactory';
import { getProjectPathPrompt } from './prompts/GetProjectPathPrompt';
import { simpleCrudStrategyFactory } from './strategies/simpleCrudStrategy';

const logger = LoggerFactory.createWinstonLogger();
console.log('Starting');
logger.log({ message: 'Starting', level: 'info' });

async function bootstrap() {
  const connection = await ConnectionFactory.createSqlServerConnection();
  const dataContainer = DataContainerFactory.createDataContainer();
  const appContext = ContextFactory.createAppContext(
    dataContainer,
    logger.child({ service: 'AppContext' }),
  );

  const tableAction = ActionsFactory.createGetTablesAction(connection);
  const strategyBuilder = new StrategyBuilder('simpleCrudStrategy', ['dbName']);

  strategyBuilder.addAction(tableAction);
  const simpleCrudStrategy = simpleCrudStrategyFactory(strategyBuilder);

  appContext._strategy = simpleCrudStrategy;
  console.log('CLI Started');
  await appContext.execute();

  logger.log({ message: 'CLI Started', level: 'info' });

  await connection.close();
  console.log('Connection closed');
  console.log('Finished');
}

bootstrap().catch(e => {
  logger.log({ message: e.message, level: 'error' });
});

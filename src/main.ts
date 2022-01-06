#!/usr/bin/env node

import 'dotenv/config';
import { StrategyBuilder } from './builders';
import { ContextFactory } from './factories/contextFactory';
import { DataContainerFactory } from './factories/dataContainerFactory';
import { LoggerFactory } from './factories/loggerFactory';
import { MvFrameworkStrategyFactory } from './strategies';

const logger = LoggerFactory.createWinstonLogger();
console.log('Starting');
logger.log({ message: 'Starting', level: 'info' });

async function bootstrap() {
  const dataContainer = DataContainerFactory.createDataContainer();
  const appContext = ContextFactory.createAppContext(
    dataContainer,
    logger.child({ service: 'AppContext' }),
  );

  const strategyBuilder = new StrategyBuilder('mvFrameworkStrategy', []);

  const mvFrameworkStrategy = MvFrameworkStrategyFactory(strategyBuilder);

  appContext._strategy = mvFrameworkStrategy;
  console.log('Strategy: ', appContext._strategy.name);
  console.log('CLI Started');
  await appContext.execute();

  logger.log({ message: 'CLI Started', level: 'info' });

  console.log('Connection closed');
  console.log('Finished');
}

bootstrap().catch(e => {
  logger.log({ message: e.message, level: 'error' });
});

#!/usr/bin/env node

import 'dotenv/config';
import inquirer from 'inquirer';
import { StrategyBuilder } from './builders';
import { ContextFactory } from './factories/contextFactory';
import { DataContainerFactory } from './factories/dataContainerFactory';
import { LoggerFactory } from './factories/loggerFactory';
import { IStrategy, MvFrameworkStrategyFactory } from './strategies';
import { NovaStrategyFactory } from './strategies/Nova';

// Inicializa o Logger
const logger = LoggerFactory.createWinstonLogger();
console.log('Starting');
logger.log({ message: 'Starting', level: 'info' });

async function bootstrap() {
  const dataContainer = DataContainerFactory.createDataContainer();
  const appContext = ContextFactory.createAppContext(
    dataContainer,
    logger.child({ service: 'AppContext' }),
  );

  const strategyBuilder = new StrategyBuilder();

  const mvFrameworkStrategy = MvFrameworkStrategyFactory(strategyBuilder);
  const novaStrategy = NovaStrategyFactory(strategyBuilder);

  const strategies: IStrategy[] = [];
  strategies.push(mvFrameworkStrategy);
  strategies.push(novaStrategy);

  console.clear();
  const { strategyName } = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'strategyName',
      message: 'Escolha uma estratégia',
      choices: strategies.map(s => s.name),
    },
  ]);

  const strategy = strategies.find(s => s.name === strategyName);

  appContext._strategy = strategy;
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

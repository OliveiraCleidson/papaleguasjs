/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
import path from 'path';
import fs from 'fs';
import { StrategyBuilder } from './builders';
import { IStrategy } from './strategies';
import { StrategyFactory } from './@types';

// eslint-disable-next-line consistent-return
export async function getStrategiesFromRcJson() {
  let local = process.cwd();
  local = path.resolve(local, 'papaleguasrc.json');

  try {
    const txtConfig = await fs.promises.readFile(local, 'utf8');
    const config = JSON.parse(txtConfig);

    const strategyBuilder = new StrategyBuilder();
    const strategies: IStrategy[] = [];
    for (const strategy of config.strategies) {
      const parsedStrategy = strategy.replace(/((\.)(ts|js|mjs))/g, '');
      const { strategyFactory } = (await import(
        path.resolve(process.cwd(), parsedStrategy)
      )) as { strategyFactory: StrategyFactory };

      const result = strategyFactory(strategyBuilder);
      strategies.push(result);
    }
    console.log('Fim');
    return strategies;
  } catch {
    console.log('Não foi possível ler o arquivo de configuração');
    process.abort();
  }
  console.log('Fim');
}

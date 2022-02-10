import { StrategyBuilder } from '@/builders';
import { IStrategy } from '@/strategies';

export type DataContainer = {
  [key: string]: object | string | number;
};

export type StrategyFactory = (strategyBuilder: StrategyBuilder) => IStrategy;

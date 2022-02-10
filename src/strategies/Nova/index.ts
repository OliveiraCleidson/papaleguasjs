import { GetTablesAction } from '@/actions';
import { StrategyBuilder } from '@/builders';
import { GetNameAction } from './actions/GetNameAction';

export const strategyFactory = (strategyBuilder: StrategyBuilder) => {
  strategyBuilder.name = 'Nova Strategy';
  strategyBuilder.addAction(new GetNameAction());

  return strategyBuilder.build();
};

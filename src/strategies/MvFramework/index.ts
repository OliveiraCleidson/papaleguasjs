import { GetTablesAction } from '@/actions';
import { StrategyBuilder } from '@/builders';
import {
  CloseConnectionAction,
  GenerateRepositoriesAction,
  GetConnectionAction,
} from './actions';

export const MvFrameworkStrategyFactory = (
  strategyBuilder: StrategyBuilder,
) => {
  strategyBuilder.name = 'MvFramework Strategy';
  strategyBuilder.addAction(new GetConnectionAction());
  strategyBuilder.addAction(new GetTablesAction());
  strategyBuilder.addAction(new GenerateRepositoriesAction());
  strategyBuilder.addAction(new CloseConnectionAction());
  return strategyBuilder.build();
};

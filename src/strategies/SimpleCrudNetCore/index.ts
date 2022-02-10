import { GetTablesAction } from '@/actions';
import { GenerateContentAction } from './actions/generateContentAction';
import { StrategyBuilder } from '@/builders';
import { GetConnectionAction } from '../MvFramework/actions';

export const strategyFactory = (strategyBuilder: StrategyBuilder) => {
  strategyBuilder.name = 'simpleCrud';
  strategyBuilder.addAction(new GetConnectionAction());
  strategyBuilder.addAction(new GetTablesAction());
  strategyBuilder.addAction(new GenerateContentAction());

  return strategyBuilder.build();
};

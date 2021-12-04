import { GenerateContentAction } from '@/actions/byStrategy/simpleCrud/generateContentAction';
import { StrategyBuilder } from '@/builders';

export const simpleCrudStrategyFactory = (strategyBuilder: StrategyBuilder) => {
  strategyBuilder.name = 'simpleCrud';
  strategyBuilder.addAction(new GenerateContentAction());

  return strategyBuilder.build();
};

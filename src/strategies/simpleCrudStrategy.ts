import { GenerateContentAction } from '@/actions/byStrategy/simpleCrud/generateContentAction';
import { StrategyBuilder } from '@/builders';

export const simpleCrudStrategyFactory = (strategyBuilder: StrategyBuilder) => {
  strategyBuilder.addAction(new GenerateContentAction());
  return strategyBuilder.build();
};

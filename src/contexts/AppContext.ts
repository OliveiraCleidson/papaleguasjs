import { Logger } from 'winston';
import inquirer, { PromptModule } from 'inquirer';
import { DataContainer } from '@/@types';
import { IStrategy } from '@/strategies/IStrategy';
import { Action } from '@/actions/Action';

export class AppContext {
  constructor(
    private _dataContainer: DataContainer,
    private readonly _logger: Logger,
    public _strategy: IStrategy = null,
  ) {}

  async execute() {
    if (this._strategy == null) {
      throw new Error('Missing strategy in AppContext');
    }

    while (!this._strategy.process.isEmpty()) {
      const process = this._strategy.process.dequeue();

      try {
        if (process instanceof Action) {
          this._logger.log({
            level: 'info',
            message: `${AppContext.name} - Executing action: ${process.name}`,
          });

          await process.execute(this._dataContainer);

          this._logger.log({
            level: 'info',
            message: `${AppContext.name} - Action OK`,
          });
        } else {
          this._logger.log({
            level: 'info',
            message: `${AppContext.name} - Executing prompt ${process.name}`,
          });
          const data: object = await inquirer.prompt(process.prompt);
          this._logger.log({
            level: 'info',
            message: `${AppContext.name} - Prompt OK`,
          });

          this._dataContainer = { ...this._dataContainer, ...data };
        }
      } catch (err) {
        const error: Error = err;

        this._logger.log({
          level: 'error',
          message: error.message,
        });
        console.log('Ocorreu um erro');
      }
    }
  }
}

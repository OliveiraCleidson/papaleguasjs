import { Action } from '@/actions/Action';
import { Prompt } from '@/prompts/Prompt';
import { IStrategy } from '@/strategies/IStrategy';
import { Queue } from '@/structs/Queue';

export class StrategyBuilder {
  private _process: (Action | Prompt)[];

  private _inputData: string[];

  private _strategy: IStrategy;

  constructor(public name: string = '', initialInputData: string[] = []) {
    this._clear(name, initialInputData);
  }

  addAction(action: Action) {
    this._process.push(action);
  }

  addPrompt(prompt: Prompt) {
    this._process.push(prompt);
  }

  build(): IStrategy {
    while (this._process.length !== 0) {
      const process = this._process.shift();

      if (process instanceof Action) {
        const data = process.inputData.filter(
          e => !this._inputData.includes(e),
        );
        if (data.length !== 0) {
          throw new Error(
            `Insuficient data to action ${process.name} in ${this.name} strategy: ${data}`,
          );
        }
      }

      this._inputData = [...this._inputData, ...process.outputData];
      this._strategy.process.enqueue(process);
    }

    console.log(`${this.name} build success`);

    const strategy = this._strategy;
    this._clear('');
    return strategy;
  }

  private _clear(name: string, initialInputData: string[] = []) {
    this._process = [];
    this._inputData = initialInputData;
    this._strategy = {
      process: new Queue<Action>(),
      name,
    };
  }
}

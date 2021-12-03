import { Action } from '../actions/Action';
import { Prompt } from '../prompts/Prompt';
import { IStrategy } from '../strategies/IStrategy';
export declare class StrategyBuilder {
    name: string;
    private _process;
    private _inputData;
    private _strategy;
    constructor(name: string, initialInputData?: string[]);
    addAction(action: Action): void;
    addPrompt(prompt: Prompt): void;
    build(): IStrategy;
}

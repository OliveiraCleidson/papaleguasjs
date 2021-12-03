import inquirer from 'inquirer';
export declare class Prompt {
    name: string;
    outputData: string[];
    prompt: inquirer.QuestionCollection<any>;
    constructor(name: string, outputData: string[], prompt: inquirer.QuestionCollection<any>);
}

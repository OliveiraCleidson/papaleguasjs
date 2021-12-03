import inquirer from 'inquirer';

export class Prompt {
  constructor(
    public name: string,
    public outputData: string[],
    public prompt: inquirer.QuestionCollection<any>,
  ) {
    this.outputData = [];
  }
}

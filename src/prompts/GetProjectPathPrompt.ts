import { Prompt } from './Prompt';

export const getProjectPathPrompt = () =>
  new Prompt(
    'GetProjectPathPrompt',
    ['projectPath'],
    [
      {
        type: 'input',
        name: 'projectPath',
        message: 'Insira o Path do Projeto',
      },
    ],
  );

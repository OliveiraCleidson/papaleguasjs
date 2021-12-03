"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectPathPrompt = void 0;
const Prompt_1 = require("./Prompt");
const getProjectPathPrompt = () => new Prompt_1.Prompt('GetProjectPathPrompt', ['projectPath'], [
    {
        type: 'input',
        name: 'projectPath',
        message: 'Insira o Path do Projeto',
    },
]);
exports.getProjectPathPrompt = getProjectPathPrompt;
//# sourceMappingURL=GetProjectPathPrompt.js.map
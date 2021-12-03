"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewModelTemplate = void 0;
const camel_case_1 = require("camel-case");
const viewModelTemplate = ({ modelName, props, }) => `using System;
using Menumax.Models;
using Menumax.Shared.Helpers;
using Menumax.ViewModels.Compacts;

namespace Menumax.ViewModels
{
    public class ${modelName}ViewModel
    {
        public ${modelName}ViewModel()
        {
        }

        public ${modelName}ViewModel(${modelName} ${(0, camel_case_1.camelCase)(modelName)})
        {
          MapHelper.FromOtherObject(this, ${(0, camel_case_1.camelCase)(modelName)});
        }

        ${props}
    }
}`;
exports.viewModelTemplate = viewModelTemplate;
//# sourceMappingURL=viewModelTemplate.js.map
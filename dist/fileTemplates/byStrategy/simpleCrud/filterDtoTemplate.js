"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterDtoTemplate = void 0;
const filterDtoTemplate = ({ modelName, props, }) => `using System;
using Menumax.Dtos.Filters;
using Menumax.Models;

namespace Menumax.Dtos.Update
{
    public class ${modelName}FilterDto : FilterDto<${modelName}>
    {
        ${props}
    }
}`;
exports.filterDtoTemplate = filterDtoTemplate;
//# sourceMappingURL=filterDtoTemplate.js.map
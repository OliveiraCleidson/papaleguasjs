"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDtoTemplate = void 0;
const updateDtoTemplate = ({ modelName, props, }) => `using System;
using Menumax.Shared.Dtos;

namespace Menumax.Dtos.Update
{
    public class Update${modelName}Dto : Dto
    {
        ${props}
    }
}`;
exports.updateDtoTemplate = updateDtoTemplate;
//# sourceMappingURL=updateDtoTemplate.js.map
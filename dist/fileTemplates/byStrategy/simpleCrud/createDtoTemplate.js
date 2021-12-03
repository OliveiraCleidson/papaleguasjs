"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDtoTemplate = void 0;
const createDtoTemplate = ({ modelName, props, }) => `using System;
using Menumax.Shared.Dtos;

namespace Menumax.Dtos.Create
{
    public class Create${modelName}Dto : Dto
    {
        ${props}
    }
}`;
exports.createDtoTemplate = createDtoTemplate;
//# sourceMappingURL=createDtoTemplate.js.map
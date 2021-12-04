import { DataContainer } from '@/@types';

export const filterDtoTemplate = ({
  modelName,
  props,
}: DataContainer) => `using System;
using Menumax.Models;
using Menumax.Shared.Dtos.Filters;

namespace Menumax.Dtos.Update
{
    public class ${modelName}FilterDto : FilterDto<${modelName}>
    {
        ${props}
    }
}`;

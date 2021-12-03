import { DataContainer } from '@/@types';

export const filterDtoTemplate = ({
  modelName,
  props,
}: DataContainer) => `using System;
using Menumax.Dtos.Filters;
using Menumax.Models;

namespace Menumax.Dtos.Update
{
    public class ${modelName}FilterDto : FilterDto<${modelName}>
    {
        ${props}
    }
}`;

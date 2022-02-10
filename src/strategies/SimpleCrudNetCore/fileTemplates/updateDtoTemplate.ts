import { DataContainer } from '@/@types';

export const updateDtoTemplate = ({
  modelName,
  props,
}: DataContainer) => `using System;
using Menumax.Shared.Dtos;

namespace Menumax.Dtos.Update 
{
    public class Update${modelName}Dto : ActionDto
    {
        ${props}
    }
}`;

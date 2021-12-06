import { DataContainer } from '@/@types';

export const createDtoTemplate = ({
  modelName,
  props,
}: DataContainer) => `using System;
using Menumax.Shared.Dtos;

namespace Menumax.Dtos.Create
{
    public class Create${modelName}Dto : ActionDto
    {
        ${props}
    }
}`;

import { camelCase } from 'camel-case';
import { DataContainer } from '@/@types';

export const viewModelTemplate = ({
  modelName,
  props,
}: DataContainer) => `using System;
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

        public ${modelName}ViewModel(${modelName} ${camelCase(
  modelName as string,
)})
        {
          MapHelper.FromOtherObject(this, ${camelCase(modelName as string)});
        }

        ${props}
    }
}`;

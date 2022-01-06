import { DataContainer } from '@/@types';

export const domainRepositoryTemplate = ({
  domain,
  modelName,
}: DataContainer) => `using System;
using Domain.${domain}.Models;
using Domain.Shared.Repositories;

namespace Domain.${domain}.Repositories
{
  public interface I${modelName}Repository : ICrudRepository<${modelName}>
  {

  }
}
`;

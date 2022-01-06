import { DataContainer } from '@/@types';

export const infraRepositoryTemplate = ({
  modelName,
  domain,
  table,
}: DataContainer) => `using System;
using System.Linq;
using System.Threading.Tasks;
using Domain.${domain}.Models;
using Domain.${domain}.Repositories;
using Domain.Infra.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Domain.Infra.${domain}.Repositories
{
  public class ${modelName}Repository : I${modelName}Repository
  {
    private DomainContext _context;
    public ${modelName}Repository(DomainContext context)
    {
      _context = context;
    }

    public async Task<bool> Create(${modelName} entity)
    {
      _context.${(table as any).displayName.plural as string}.Add(entity);
      await _context.SaveChangesAsync();
      return true;
    }

    public Task<${modelName}> GetById(Guid id)
    {
      return _context.${(table as any).displayName.plural}.FirstOrDefaultAsync(
        e => e.${
          (table as any).columns.find(e => e.isIdentity).displayName
        } == id
      );
    }

    public async Task<bool> Update(${modelName} entity)
    {
      _context.Entry(entity).State = EntityState.Modified;

      await _context.SaveChangesAsync();
      return true;
    }
  }
}
`;

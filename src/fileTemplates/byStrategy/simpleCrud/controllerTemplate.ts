import { camelCase } from 'camel-case';
import { pascalCase } from 'pascal-case';
import { DataContainer } from '@/@types';

// modelName, plural as string, controllerName, version
export const controllerTemplate = ({
  modelName,
  plural,
  controllerName,
  version = 1,
}: DataContainer) => `using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Menumax.Data;
using Menumax.Dtos.Create;
using Menumax.Dtos.Update;
using Menumax.Factories;
using Menumax.Models;
using Menumax.Services;
using Menumax.Shared.Helpers;
using Menumax.Shared.Queries;
using Menumax.Shared.ViewModels;
using Menumax.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Menumax.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("v${version}/${controllerName}")]
    public class ${modelName}Controller : ControllerBase
    {
        private readonly MenumaxContext _context;
        private readonly DefaultQuery _defaultQuery;

        public ${modelName}Controller(MenumaxContext context, DefaultQuery defaultQuery)
        {
            _context = context;
            _defaultQuery = defaultQuery;
        }

        [ProducesResponseType(401)]
        [ProducesResponseType(200, Type = typeof(PageableResultViewModel<ICollection<${modelName}ViewModel>>))]
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] ${modelName}FilterDto ${camelCase(
  modelName as string,
)}FilterDto)
        {
            var query = _context.${pascalCase(plural as string)}.AsNoTracking()
                .IgnoreAutoIncludes()
                .Where(e => e.ExcludedGuid == null);

            var lambda = ${camelCase(
              modelName as string,
            )}FilterDto.GetExpression();
            if (lambda != null)
            {
                query = query.Where(lambda);
            }

            var defaultQueryResult = await _defaultQuery.QueryPageable(${camelCase(
              modelName as string,
            )}FilterDto, query);

            var entities = await defaultQueryResult
                .Query
                .Select(e => new ${modelName}ViewModel(e))
                .ToListAsync();

            var result = new PageableResultViewModel<ICollection<${modelName}ViewModel>>(
                entities,
                ${camelCase(modelName as string)}FilterDto.Page,
                defaultQueryResult.Total,
                defaultQueryResult.TotalPages
            );

            return Ok(result);
        }

        [ProducesResponseType(401)]
        [ProducesResponseType(200, Type = typeof(${modelName}ViewModel))]
        [ProducesResponseType(404)]
        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var entity = await _context.${pascalCase(plural as string)}
                .AsNoTracking()
                .IgnoreAutoIncludes()
                .FirstOrDefaultAsync(e =>
                    e.${modelName}Id == id
                    && e.ExcludedGuid == null
                );
            if (null == entity)
            {
                return NotFound();
            }

            return Ok(new ${modelName}ViewModel(entity));
        }

        [ProducesResponseType(401)]
        [ProducesResponseType(201)]
        [ProducesResponseType(400, Type = typeof(ProblemDetails))]
        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody] Create${modelName}Dto create${modelName}Dto,
            [FromServices] LoggedUserService loggedUserService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var model = ModelFactory.FromOtherClass<Create${modelName}Dto, ${modelName}>(create${modelName}Dto);
            model.CreatedBy = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            model.UpdatedBy = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

            _context.${pascalCase(plural as string)}.Add(model);

            await _context.SaveChangesAsync();
            return Ok();
        }

        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400, Type = typeof(ProblemDetails))]
        [HttpPut("{id:Guid}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Update${modelName}Dto update${modelName}Dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ${camelCase(modelName as string)} = await _context.${pascalCase(
  plural as string,
)}
                .FirstOrDefaultAsync(e =>
                    e.${modelName}Id == id
                    && e.ExcludedGuid == null
                );

            if (null == ${camelCase(modelName as string)}) return NotFound();

            ${camelCase(
              modelName as string,
            )} = MapHelper.FromOtherObject(${camelCase(
  modelName as string,
)}, update${modelName}Dto);

            ${camelCase(
              modelName as string,
            )}.UpdatedBy = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            ${camelCase(modelName as string)}.DtUpdatedAt = DateTime.UtcNow;
            
            _context.Entry(${camelCase(
              modelName as string,
            )}).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [ProducesResponseType(401)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var ${camelCase(modelName as string)} = await _context.${pascalCase(
  plural as string,
)}.FirstOrDefaultAsync(e => e.${modelName}Id == id && e.ExcludedGuid == null);

            if (null == ${camelCase(modelName as string)}) return NotFound();

            ${camelCase(modelName as string)}.ExcludedGuid = Guid.NewGuid();
            ${camelCase(
              modelName as string,
            )}.UpdatedBy = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            ${camelCase(modelName as string)}.DtUpdatedAt = DateTime.UtcNow;
            
            _context.Entry(${camelCase(
              modelName as string,
            )}).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}`;

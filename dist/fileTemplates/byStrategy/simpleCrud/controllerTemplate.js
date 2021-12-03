"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerTemplate = void 0;
const camel_case_1 = require("camel-case");
const pascal_case_1 = require("pascal-case");
// modelName, plural as string, controllerName, version
const controllerTemplate = ({ modelName, plural, controllerName, version = 1, }) => `using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Menumax.Data;
using Menumax.Dtos.Create;
using Menumax.Dtos.Filters;
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
        public async Task<IActionResult> Get([FromQuery] ${modelName}FilterDto ${(0, camel_case_1.camelCase)(modelName)}FilterDto)
        {
            var query = _context.${(0, pascal_case_1.pascalCase)(plural)}.AsNoTracking()
                .IgnoreAutoIncludes()
                .Where(e => e.ExcludedGuid == null);

            var lambda = ${(0, camel_case_1.camelCase)(modelName)}FilterDto.GetExpression();
            if (lambda != null)
            {
                query = query.Where(lambda);
            }

            var defaultQueryResult = await _defaultQuery.QueryPageable(${(0, camel_case_1.camelCase)(modelName)}FilterDto, query);

            var entities = await defaultQueryResult
                .Query
                .Select(e => new ${modelName}ViewModel(e))
                .ToListAsync();

            var result = new PageableResultViewModel<ICollection<${modelName}ViewModel>>(
                entities,
                ${(0, camel_case_1.camelCase)(modelName)}FilterDto.Page,
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
            var entity = await _context.${(0, pascal_case_1.pascalCase)(plural)}
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

            _context.${(0, pascal_case_1.pascalCase)(plural)}.Add(model);

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

            var ${(0, camel_case_1.camelCase)(modelName)} = await _context.${(0, pascal_case_1.pascalCase)(plural)}
                .FirstOrDefaultAsync(e =>
                    e.${modelName}Id == id
                    && e.ExcludedGuid == null
                );

            if (null == ${(0, camel_case_1.camelCase)(modelName)}) return NotFound();

            ${(0, camel_case_1.camelCase)(modelName)} = MapHelper.FromOtherObject(${(0, camel_case_1.camelCase)(modelName)}, update${modelName}Dto);

            ${(0, camel_case_1.camelCase)(modelName)}.UpdatedBy = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            ${(0, camel_case_1.camelCase)(modelName)}.DtUpdatedAt = DateTime.UtcNow;
            
            _context.Entry(${(0, camel_case_1.camelCase)(modelName)}).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [ProducesResponseType(401)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var ${(0, camel_case_1.camelCase)(modelName)} = await _context.${(0, pascal_case_1.pascalCase)(plural)}.FirstOrDefaultAsync(e => e.${modelName}Id == id && e.ExcludedGuid == null);

            if (null == ${(0, camel_case_1.camelCase)(modelName)}) return NotFound();

            ${(0, camel_case_1.camelCase)(modelName)}.ExcludedGuid = Guid.NewGuid();
            ${(0, camel_case_1.camelCase)(modelName)}.UpdatedBy = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            ${(0, camel_case_1.camelCase)(modelName)}.DtUpdatedAt = DateTime.UtcNow;
            
            _context.Entry(${(0, camel_case_1.camelCase)(modelName)}).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}`;
exports.controllerTemplate = controllerTemplate;
//# sourceMappingURL=controllerTemplate.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumnsByTableQuery = void 0;
const getColumnsByTableQuery = (tableName) => `
    SELECT 
    c.name 'name',
    t.Name 'dataType',
    c.max_length 'maxLength',
    c.precision ,
    c.scale ,
    c.is_nullable 'isNullable',
    ISNULL(i.is_primary_key, 0) 'isIdentity'
    FROM    
      sys.columns c
    INNER JOIN 
      sys.types t ON c.user_type_id = t.user_type_id
    LEFT OUTER JOIN 
      sys.index_columns ic ON ic.object_id = c.object_id AND ic.column_id = c.column_id
    LEFT OUTER JOIN 
      sys.indexes i ON ic.object_id = i.object_id AND ic.index_id = i.index_id
    WHERE
      c.object_id = OBJECT_ID('${tableName}')
  `;
exports.getColumnsByTableQuery = getColumnsByTableQuery;
//# sourceMappingURL=getColumnsByTableQuery.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTablesByDbQuery = void 0;
const getTablesByDbQuery = (dbName) => `
SELECT TABLE_NAME 'name'
   FROM INFORMATION_SCHEMA.TABLES
  WHERE TABLE_TYPE      = 'BASE TABLE' 
    AND TABLE_CATALOG   ='${dbName}'
    `;
exports.getTablesByDbQuery = getTablesByDbQuery;
//# sourceMappingURL=getTableByDbQuery.js.map
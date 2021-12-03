export const getTablesByDbQuery = (dbName: string) => `
SELECT TABLE_NAME 'name'
   FROM INFORMATION_SCHEMA.TABLES
  WHERE TABLE_TYPE      = 'BASE TABLE' 
    AND TABLE_CATALOG   ='${dbName}'
    `;

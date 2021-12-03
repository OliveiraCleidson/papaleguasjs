export const LANGUAGE_TYPES = [
  {
    sql: 'varchar',
    c: { normal: 'string', nullable: 'string' },
  },
  {
    sql: 'int',
    c: { normal: 'int', nullable: 'int?' },
  },
  {
    sql: 'text',
    c: { normal: 'string', nullable: 'string' },
  },
  {
    sql: 'bit',
    c: { normal: 'bool', nullable: 'bool' },
  },
  {
    sql: 'datetime',
    c: { normal: 'DateTime', nullable: 'DateTime?' },
  },
  {
    sql: 'decimal',
    c: { normal: 'int', nullable: 'int?' },
  },
  {
    sql: 'numeric',
    c: { normal: 'decimal', nullable: 'decimal?' },
  },
  {
    sql: 'time',
    c: { normal: 'TimeSpan', nullable: 'TimeSpan?' },
  },
  { sql: 'float', c: { normal: 'float', nullable: 'float?' } },
  { sql: 'double', c: { normal: 'double', nullable: 'double?' } },
  { sql: 'tinyint', c: { normal: 'int', nullable: 'int?' } },
  { sql: 'smallint', c: { normal: 'int', nullable: 'int?' } },
  { sql: 'bigint', c: { normal: 'int', nullable: 'int?' } },
  { sql: 'mediumint', c: { normal: 'int', nullable: 'int?' } },
  { sql: 'timestamp', c: { normal: 'DateTime', nullable: 'DateTime?' } },
  { sql: 'date', c: { normal: 'DateTime', nullable: 'DateTime?' } },
  { sql: 'uniqueidentifier', c: { normal: 'Guid', nullable: 'Guid?' } },
] as const;

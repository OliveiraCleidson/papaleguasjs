export declare const LANGUAGE_TYPES: readonly [{
    readonly sql: "varchar";
    readonly c: {
        readonly normal: "string";
        readonly nullable: "string";
    };
}, {
    readonly sql: "int";
    readonly c: {
        readonly normal: "int";
        readonly nullable: "int?";
    };
}, {
    readonly sql: "text";
    readonly c: {
        readonly normal: "string";
        readonly nullable: "string";
    };
}, {
    readonly sql: "bit";
    readonly c: {
        readonly normal: "bool";
        readonly nullable: "bool";
    };
}, {
    readonly sql: "datetime";
    readonly c: {
        readonly normal: "DateTime";
        readonly nullable: "DateTime?";
    };
}, {
    readonly sql: "decimal";
    readonly c: {
        readonly normal: "int";
        readonly nullable: "int?";
    };
}, {
    readonly sql: "numeric";
    readonly c: {
        readonly normal: "decimal";
        readonly nullable: "decimal?";
    };
}, {
    readonly sql: "time";
    readonly c: {
        readonly normal: "TimeSpan";
        readonly nullable: "TimeSpan?";
    };
}, {
    readonly sql: "float";
    readonly c: {
        readonly normal: "float";
        readonly nullable: "float?";
    };
}, {
    readonly sql: "double";
    readonly c: {
        readonly normal: "double";
        readonly nullable: "double?";
    };
}, {
    readonly sql: "tinyint";
    readonly c: {
        readonly normal: "int";
        readonly nullable: "int?";
    };
}, {
    readonly sql: "smallint";
    readonly c: {
        readonly normal: "int";
        readonly nullable: "int?";
    };
}, {
    readonly sql: "bigint";
    readonly c: {
        readonly normal: "int";
        readonly nullable: "int?";
    };
}, {
    readonly sql: "mediumint";
    readonly c: {
        readonly normal: "int";
        readonly nullable: "int?";
    };
}, {
    readonly sql: "timestamp";
    readonly c: {
        readonly normal: "DateTime";
        readonly nullable: "DateTime?";
    };
}, {
    readonly sql: "date";
    readonly c: {
        readonly normal: "DateTime";
        readonly nullable: "DateTime?";
    };
}, {
    readonly sql: "uniqueidentifier";
    readonly c: {
        readonly normal: "Guid";
        readonly nullable: "Guid?";
    };
}];

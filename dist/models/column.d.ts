export interface Column {
    name: string;
    dataType: string;
    displayName: string;
    maxLength: number;
    precision: number;
    scale: number;
    isNullable: boolean;
    isIdentity: boolean;
}

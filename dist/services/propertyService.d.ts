import { Column } from '../models/column';
export declare class PropertyService {
    static c_generate({ displayName: name, isNullable, dataType: type }: Column, isPrivate?: boolean): string;
    static c_generateConstructorPropsGenerator(column: Column): string;
    static c_constructorParamsGenerator(column: Column): string;
    static c_constructorViewParamsGenerator(modelName: string): string;
    static c_constructorViewPropsGenerator(column: Column): string;
    static c_generatePropsByColumns(columns: Column[]): string;
}

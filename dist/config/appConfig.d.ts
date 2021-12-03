export interface AppConfig {
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
        encrypt: boolean;
        connectionString: string;
    };
}
export declare const APP_CONFIG: AppConfig;

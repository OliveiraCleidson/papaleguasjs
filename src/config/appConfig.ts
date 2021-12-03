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

const database = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 1433,
  username: process.env.DB_USERNAME || 'sa',
  password: process.env.DB_PASSWORD || '',
  name: process.env.DB_NAME || 'test',
  encrypt: process.env.DB_ENCRYPT === 'true' || false,
  connectionString: '',
};

database.connectionString = `Server=${database.host},${database.port};Database=${database.name};User Id=${database.username};Password=${database.password};Encrypt=${database.encrypt}`;

export const APP_CONFIG: AppConfig = {
  database,
} as const;

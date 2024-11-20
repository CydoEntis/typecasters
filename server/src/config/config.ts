import path from "path";
import dotenv from "dotenv";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface Env {
  dbUrl: string | undefined;
  dbHost: string | undefined;
  dbPort: number | undefined;
  dbUser: string | undefined;
  dbPassword: string | undefined;
  dbName: string | undefined;
  appPort: number | undefined;
  jwtSecret: string;
}

export const env: Env = {
    dbUrl: process.env.DB_URL,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    appPort: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : undefined,
    jwtSecret: process.env.JWT_SECRET || "secret",
}

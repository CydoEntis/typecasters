// server/src/drizzle.ts
import { Pool } from "pg";
import * as schema from "./schema";

import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "./config";

const pool = new Pool({
	host: env.dbHost,
	port: env.dbPort,
	user: env.dbUser,
	password: env.dbPassword,
	database: env.dbName,
});

const db = drizzle(env.dbUrl!, { schema });

export default db;

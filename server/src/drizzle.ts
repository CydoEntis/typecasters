// server/src/drizzle.ts
import { Pool } from "pg";
import * as schema from "./schema";

import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
	host: "localhost",
	port: 5432,
	user: "placeholder-username",
	password: "placeholder-password",
	database: "placeholder-db",
});

const db = drizzle(process.env.DATABASE_URL!, { schema });

export default db;

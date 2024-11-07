import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "../config/config";

const db = drizzle(env.dbUrl!);

export default db;

import {
	integer,
	pgTable,
	text,
	timestamp,
	boolean,
} from "drizzle-orm/pg-core";

export const refreshTokens = pgTable("refresh_tokens", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	userId: integer("user_id").notNull(),
	accessToken: text("token").notNull(),
	refreshToken: text("token").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	expiresAt: timestamp("expires_at").notNull(),
	isExpired: boolean("is_expired").notNull().default(false),
});

import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	username: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").notNull(),
});
export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

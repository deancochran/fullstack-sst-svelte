import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import type { InferSelectModel } from "drizzle-orm";

const userTable = pgTable("user", {
	id: serial("id").primaryKey()
});

const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
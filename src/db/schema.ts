import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  task: text().notNull(),
  isCompleted: boolean().notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type Item = InferSelectModel<typeof items>;
export type NewItem = InferInsertModel<typeof items>;

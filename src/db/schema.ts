import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Example table - demonstrates basic CRUD patterns
export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type Item = InferSelectModel<typeof items>;
export type NewItem = InferInsertModel<typeof items>;

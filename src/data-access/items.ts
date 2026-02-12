import { count, eq } from "drizzle-orm";
import { db } from "@/db";
import { type Item, items } from "@/db/schema";

export async function getItemsCount(): Promise<number> {
  const [{ count: itemsCount }] = await db.select({ count: count() }).from(items);
  return itemsCount;
}

export async function getAllItems(): Promise<Item[]> {
  return await db.query.items.findMany();
}

export async function toggleItemCompletion(id: number): Promise<Item | null> {
  const item = await db.query.items.findFirst({ where: eq(items.id, id) });
  if (!item) return null;

  const [updated] = await db
    .update(items)
    .set({ isCompleted: !item.isCompleted })
    .where(eq(items.id, id))
    .returning();

  return updated ?? null;
}

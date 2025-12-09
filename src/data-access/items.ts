import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { type Item, items, type NewItem } from "@/db/schema";

export async function getItems(): Promise<Item[]> {
  return await db.query.items.findMany({
    orderBy: desc(items.createdAt),
  });
}

export async function getItemById(id: number): Promise<Item | undefined> {
  return await db.query.items.findFirst({
    where: eq(items.id, id),
  });
}

export async function createItem(
  data: Omit<NewItem, "id" | "createdAt" | "updatedAt">,
): Promise<Item> {
  const [item] = await db.insert(items).values(data).returning();
  return item;
}

export async function deleteItem(id: number): Promise<void> {
  await db.delete(items).where(eq(items.id, id));
}

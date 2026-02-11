import { count } from "drizzle-orm";
import { db } from "@/db";
import { type Item, items } from "@/db/schema";

export async function getItemsCount(): Promise<number> {
  const [{ count: itemsCount }] = await db.select({ count: count() }).from(items);
  return itemsCount;
}

export async function getAllItems(): Promise<Item[]> {
  return await db.query.items.findMany();
}

"use server";

import { revalidatePath } from "next/cache";
import { createItem, deleteItem } from "@/data-access/items";
import { createItemSchema } from "@/lib/validations/item";

export async function createItemAction(formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || undefined,
  };

  const result = createItemSchema.safeParse(rawData);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  await createItem(result.data);
  revalidatePath("/dashboard");

  return { success: true };
}

export async function deleteItemAction(id: number) {
  await deleteItem(id);
  revalidatePath("/dashboard");

  return { success: true };
}

"use server";

import { revalidatePath } from "next/cache";
import { toggleItemCompletion } from "@/data-access/items";

export async function toggleItemCompletedAction(id: number) {
  try {
    const item = await toggleItemCompletion(id);
    if (!item) {
      return { success: false, error: "Item not found" };
    }
    revalidatePath("/dashboard");
    return { success: true, error: null };
  } catch {
    return { success: false, error: "Failed to update item" };
  }
}

"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { createItemAction } from "./actions";

export function CreateItemForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error?: string } | null, formData: FormData) => {
      return await createItemAction(formData);
    },
    null,
  );

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border rounded-md bg-background"
          placeholder="Enter item name"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="w-full px-3 py-2 border rounded-md bg-background"
          placeholder="Enter description"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Item"}
      </Button>
    </form>
  );
}

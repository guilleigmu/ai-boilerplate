"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import type { Item } from "@/db/schema";
import { deleteItemAction } from "./actions";

export function ItemList({ items }: { items: Item[] }) {
  const [isPending, startTransition] = useTransition();

  if (items.length === 0) {
    return (
      <p className="text-muted-foreground">No items yet. Create one above!</p>
    );
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteItemAction(id);
    });
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-start justify-between gap-4 p-4 border rounded-md"
        >
          <div className="min-w-0 flex-1">
            <h3 className="font-medium">{item.name}</h3>
            {item.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {item.description}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Created: {item.createdAt.toLocaleDateString()}
            </p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(item.id)}
            disabled={isPending}
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
}

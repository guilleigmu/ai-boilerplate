"use client";

import { useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toggleItemCompletedAction } from "./actions";

interface ItemCheckboxProps {
  itemId: number;
  isCompleted: boolean;
}

export function ItemCheckbox({ itemId, isCompleted }: ItemCheckboxProps) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      await toggleItemCompletedAction(itemId);
    });
  }

  return (
    <Checkbox
      checked={isCompleted}
      onCheckedChange={handleToggle}
      disabled={isPending}
      aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
    />
  );
}

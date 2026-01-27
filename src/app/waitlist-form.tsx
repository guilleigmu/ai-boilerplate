"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { joinWaitlist } from "./actions";

const initialState = { success: false, error: null as string | null };

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      return joinWaitlist(formData);
    },
    initialState,
  );

  if (state.success) {
    return (
      <p className="text-sm text-muted-foreground">
        You&apos;re on the list! We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex gap-2 w-full max-w-sm">
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        required
        className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Button type="submit" disabled={pending}>
        {pending ? "Joining..." : "Join Waitlist"}
      </Button>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
    </form>
  );
}

"use server";

import { addToWaitlist, isEmailOnWaitlist } from "@/data-access/waitlist";
import { type WaitlistInput, waitlistSchema } from "@/lib/validations/waitlist";

export async function joinWaitlist(data: WaitlistInput) {
  const result = waitlistSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  const { email } = result.data;

  try {
    const alreadyExists = await isEmailOnWaitlist(email);
    if (alreadyExists) {
      return { success: false, error: "This email is already on the waitlist." };
    }

    await addToWaitlist(email);
    return { success: true, error: null };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

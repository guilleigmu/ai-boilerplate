import { db } from "@/db";
import { type WaitlistEntry, waitlist } from "@/db/schema";

export async function addToWaitlist(email: string): Promise<WaitlistEntry> {
  const [entry] = await db.insert(waitlist).values({ email }).returning();
  return entry;
}

export async function isEmailOnWaitlist(email: string): Promise<boolean> {
  const entry = await db.query.waitlist.findFirst({
    where: (w, { eq }) => eq(w.email, email),
  });
  return !!entry;
}

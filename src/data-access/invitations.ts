import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { type Invitation, invitations } from "@/db/schema";

export async function createInvitation(): Promise<string> {
  const [{ id: invitationId }] = await db
    .insert(invitations)
    .values({})
    .returning({ id: invitations.id });

  return invitationId;
}

export async function getInvitationById(
  invitationId: string,
): Promise<Invitation | undefined> {
  return await db.query.invitations.findFirst({
    where: eq(invitations.id, invitationId),
  });
}

export async function getLatestInvitation(): Promise<Invitation | undefined> {
  return await db.query.invitations.findFirst({
    orderBy: desc(invitations.createdAt),
  });
}

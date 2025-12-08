import { count } from "drizzle-orm";
import { db } from "@/db";
import {
  type NewRegistration,
  type Registration,
  registrations,
} from "@/db/schema";

export async function getRegistrationsCount(): Promise<number> {
  const [{ count: registrationsCount }] = await db
    .select({ count: count() })
    .from(registrations);
  return registrationsCount;
}

export async function getAllRegistrations(): Promise<Registration[]> {
  return await db.query.registrations.findMany();
}

export async function createRegistration(
  data: NewRegistration,
): Promise<number> {
  const [{ id: registrationId }] = await db
    .insert(registrations)
    .values(data)
    .returning({ id: registrations.id });

  return registrationId;
}

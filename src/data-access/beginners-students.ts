import { eq } from "drizzle-orm";
import { db } from "@/db";
import { beginnersStudents, type NewBeginnersStudent } from "@/db/schema";

export async function createStudent(
  data: NewBeginnersStudent,
): Promise<number> {
  const [{ id: studentId }] = await db
    .insert(beginnersStudents)
    .values(data)
    .returning({ id: beginnersStudents.id });

  return studentId;
}

export async function updateStudent(
  studentId: number,
  data: Partial<Omit<NewBeginnersStudent, "classId">>,
): Promise<void> {
  await db
    .update(beginnersStudents)
    .set(data)
    .where(eq(beginnersStudents.id, studentId));
}

export async function deleteStudent(studentId: number): Promise<void> {
  await db.delete(beginnersStudents).where(eq(beginnersStudents.id, studentId));
}

import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  type BeginnersClass,
  type BeginnersStudent,
  beginnersClasses,
  beginnersStudents,
  type NewBeginnersClass,
  type NewBeginnersStudent,
} from "@/db/schema";
import { sortClasses } from "@/lib/utils";

// UI types for classes with students
export type ClassWithStudents = BeginnersClass & {
  students: BeginnersStudent[];
};

export async function getAllBeginnersClasses(): Promise<BeginnersClass[]> {
  const classes = await db.query.beginnersClasses.findMany();
  return sortClasses(classes);
}

export async function createBeginnersClass(
  data: NewBeginnersClass,
): Promise<number> {
  const [{ id: classId }] = await db
    .insert(beginnersClasses)
    .values(data)
    .returning({ id: beginnersClasses.id });

  return classId;
}

export async function deleteBeginnersClass(classId: number): Promise<void> {
  await db.delete(beginnersClasses).where(eq(beginnersClasses.id, classId));
}

// Get all classes with their students
export async function getAllBeginnersClassesWithStudents(): Promise<
  ClassWithStudents[]
> {
  const classes = await db.query.beginnersClasses.findMany({
    with: {
      students: true,
    },
  });

  return sortClasses(classes) as ClassWithStudents[];
}

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

import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
  sql,
} from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const invitations = pgTable("invitations", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at")
    .default(sql`NOW() + INTERVAL '1 month'`)
    .notNull(),
  isValid: boolean("is_valid").default(true).notNull(),
});

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  invitationId: uuid("invitation_id")
    .references(() => invitations.id)
    .notNull(),

  // Personal Data (Step 1)
  name: text("name").notNull(),
  surnames: text("surnames").notNull(),
  dni: text("dni").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  province: text("province").notNull(),
  postalCode: text("postal_code").notNull(),
  email: text("email").notNull(),
  birthDate: timestamp("birth_date").notNull(),

  // Parent/Guardian Data (for minors)
  parentName: text("parent_name"),
  parentPhone: text("parent_phone"),
  parentBirthDate: timestamp("parent_birth_date"),
  parentDni: text("parent_dni"),

  // Banking Data (optional)
  iban: text("iban"),

  // Terms and Conditions (Step 2)
  acceptTerms: boolean("accept_terms").notNull(),

  // Privacy Policy and Marketing (Step 3)
  acceptServices: boolean("accept_services").notNull(),
  acceptAdvertisements: boolean("accept_advertisements").default(false),
  acceptImageRights: boolean("accept_image_rights").default(false),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const beginnersClasses = pgTable("beginners_classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  dayOfWeek: text("day_of_week").notNull(),
  startTime: text("start_time").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const beginnersStudents = pgTable("beginners_students", {
  id: serial("id").primaryKey(),
  classId: integer("class_id")
    .notNull()
    .references(() => beginnersClasses.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  paymentDate: timestamp("payment_date").notNull(),
  bonusStartDate: timestamp("bonus_start_date").notNull(),
  bonusEndDate: timestamp("bonus_end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Relations
export const beginnersClassesRelations = relations(
  beginnersClasses,
  ({ many }) => ({
    students: many(beginnersStudents),
  }),
);

export const beginnersStudentsRelations = relations(
  beginnersStudents,
  ({ one }) => ({
    class: one(beginnersClasses, {
      fields: [beginnersStudents.classId],
      references: [beginnersClasses.id],
    }),
  }),
);

export type Invitation = InferSelectModel<typeof invitations>;
export type NewInvitation = InferInsertModel<typeof invitations>;

export type Registration = InferSelectModel<typeof registrations>;
export type NewRegistration = InferInsertModel<typeof registrations>;

export type BeginnersClass = InferSelectModel<typeof beginnersClasses>;
export type NewBeginnersClass = InferInsertModel<typeof beginnersClasses>;

export type BeginnersStudent = InferSelectModel<typeof beginnersStudents>;
export type NewBeginnersStudent = InferInsertModel<typeof beginnersStudents>;

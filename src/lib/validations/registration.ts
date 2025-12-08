import { z } from "zod";
import { VALIDATION } from "../constants";
import { calculateAge } from "../utils";

// Step 1: Personal Information and Banking Data
export const step1Schema = z
  .object({
    // Personal Data
    name: z
      .string()
      .min(1, "El nombre es obligatorio")
      .max(
        VALIDATION.MAX_LENGTHS.NAME,
        `El nombre no puede exceder ${VALIDATION.MAX_LENGTHS.NAME} caracteres`,
      ),
    surnames: z
      .string()
      .min(1, "Los apellidos son obligatorios")
      .max(
        VALIDATION.MAX_LENGTHS.SURNAMES,
        `Los apellidos no pueden exceder ${VALIDATION.MAX_LENGTHS.SURNAMES} caracteres`,
      ),
    dni: z
      .string()
      .regex(VALIDATION.DNI_REGEX, "Formato de DNI inválido (ej: 12345678A)")
      .transform((val) => val.toUpperCase()),
    phone: z
      .e164("Este teléfono no es válido")
      .min(1, "El teléfono es obligatorio"),
    address: z
      .string()
      .min(1, "El domicilio es obligatorio")
      .max(
        VALIDATION.MAX_LENGTHS.ADDRESS,
        `El domicilio no puede exceder ${VALIDATION.MAX_LENGTHS.ADDRESS} caracteres`,
      ),
    city: z
      .string()
      .min(1, "La localidad es obligatoria")
      .max(
        VALIDATION.MAX_LENGTHS.CITY,
        `La localidad no puede exceder ${VALIDATION.MAX_LENGTHS.CITY} caracteres`,
      ),
    province: z
      .string()
      .min(1, "La provincia es obligatoria")
      .max(
        VALIDATION.MAX_LENGTHS.PROVINCE,
        `La provincia no puede exceder ${VALIDATION.MAX_LENGTHS.PROVINCE} caracteres`,
      ),
    postalCode: z
      .string()
      .regex(
        VALIDATION.POSTAL_CODE_REGEX,
        "El código postal debe tener 5 dígitos",
      ),
    email: z
      .email("Formato de correo electrónico inválido")
      .min(1, "El correo electrónico es obligatorio"),
    birthDate: z.date({
      message: "La fecha de nacimiento es obligatoria",
    }),
    // Minors Data - conditional
    parentName: z.string().optional(),
    parentPhone: z
      .e164("Este teléfono no es válido")
      .optional()
      .or(z.literal("")),
    parentBirthDate: z.date().optional(),
    parentDni: z
      .string()
      .regex(VALIDATION.DNI_REGEX, "Formato de DNI inválido (ej: 12345678A)")
      .transform((val) => val.toUpperCase())
      .optional()
      .or(z.literal("")),
    // Banking Data - optional
    iban: z
      .string()
      .regex(VALIDATION.IBAN_REGEX, "Formato de IBAN inválido")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const age = calculateAge(data.birthDate);

    // If person is under 18, parent fields are required
    if (age < VALIDATION.MIN_AGE_ADULT) {
      if (!data.parentName || data.parentName.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message:
            "El nombre del tutor legal es obligatorio para menores de edad",
          path: ["parentName"],
        });
      }

      if (!data.parentPhone || data.parentPhone.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message:
            "El teléfono del tutor legal es obligatorio para menores de edad",
          path: ["parentPhone"],
        });
      }

      if (!data.parentBirthDate) {
        ctx.addIssue({
          code: "custom",
          message:
            "La fecha de nacimiento del tutor legal es obligatoria para menores de edad",
          path: ["parentBirthDate"],
        });
      } else {
        // Validate that parent is at least 18 years old
        const parentAge = calculateAge(data.parentBirthDate);
        if (parentAge < VALIDATION.MIN_AGE_ADULT) {
          ctx.addIssue({
            code: "custom",
            message: "El tutor legal debe ser mayor de edad (18 años o más)",
            path: ["parentBirthDate"],
          });
        }
      }

      if (!data.parentDni || data.parentDni.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "El DNI del tutor legal es obligatorio para menores de edad",
          path: ["parentDni"],
        });
      }
    }
  });

// Step 2: Terms and Conditions
export const step2Schema = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Debe aceptar las normas y condiciones de la escuela",
  }),
});

// Step 3: Privacy Policy and Marketing
export const step3Schema = z.object({
  acceptServices: z.boolean().refine((val) => val === true, {
    message: "Debe aceptar recibir comunicaciones sobre servicios",
  }),
  acceptAdvertisements: z.boolean().optional(),
  acceptImageRights: z.boolean().optional(),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;

export type RegistrationFormData = Step1FormData &
  Step2FormData &
  Step3FormData;

import { z } from "zod";

export const alumnxSchema = z.object({
  fullName: z.string().min(1, "El nombre completo es requerido"),
  paymentDate: z.date({ message: "La fecha de pago es requerida" }),
  bonusDateRange: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    {
      message: "El rango de fechas es requerido",
    },
  ),
});

export type AlumnxFormData = z.infer<typeof alumnxSchema>;

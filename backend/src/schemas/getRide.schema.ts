import { z } from "zod";

// Validação direta de `customer_id`
export const customerSchema = z
  .string()
  .min(1, { message: "O ID do cliente é obrigatório." })

// Validação direta de `driver_id` (opcional)
export const driverSchema = z
  .string()
  .optional()
  .refine((id) => !id || /^\d+$/.test(id), { message: "O ID do motorista deve ser um número válido." });
import { z } from "zod";

export const confirmSchema = z.object({
  customer_id: z
    .string()
    .min(1, { message: "Preenchimento do usuário é Obrigatório" }),
  origin: z
    .string()
    .min(1, { message: "Preenchimento de Origem é Obrigatório" }),
  destination: z
    .string()
    .min(1, { message: "Preenchimento de Destino é Obrigatório" }),
  distance: z
    .number()
    .positive("Os dados fornecidos no corpo da requisição são inválidos"),
  duration: z
    .string()
    .min(1, {
      message: "Os dados fornecidos no corpo da requisição são inválidos",
    }),
  driver: z.object({
    id: z.number().positive().min(1, "Os dados fornecidos no corpo da requisição são inválidos"),
    name: z.string().min(1, "Os dados fornecidos no corpo da requisição são inválidos"),
  }),
  value: z.number().positive().min(1, "Os dados fornecidos no corpo da requisição são inválidos"),
});

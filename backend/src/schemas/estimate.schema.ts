import { z } from "zod";

export const estimateRideSchema = z.object({
    user: z.string().min(1, {message: "Preenchimento do usuário é Obrigatório"}),
    origin: z.string().min(1, {message: "Preenchimento de Origem é Obrigatório"}),
    destination: z.string().min(1, {message: "Preenchimento de Destino é Obrigatório"}), 
});


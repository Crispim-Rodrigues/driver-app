import { z } from "zod"
 
export const formSchema = z.object({
  user: z.string().min(2,"O id de usuário deve conter pelo meno 2 caracter(s)").max(150),
  origin: z.string().min(2,"O endereço de partida deve conter pelo meno 2 caracter(s)").max(150),
  destination: z.string().min(2, "O endereço de destino deve conter pelo meno 2 caracter(s)").max(150),
})
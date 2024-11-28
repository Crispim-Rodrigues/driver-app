import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas/RideRequest.schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {useNavigate} from "react-router-dom";
import axios, { AxiosError }from 'axios';
import { ErrorRequestType } from "@/types/RideRequest";
import { useState } from "react";


function RideRequest() {
  const navigate = useNavigate()
  const [error, setError] = useState<ErrorRequestType | null>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      origin: "",
      destination: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null)
    try {
      const response = await axios.post(`backend:8080/ride/estimate`, values); // Substitua pela URL da sua API
      navigate("/opcoes", {state: response.data})// Navegar para a tela de opções com os dados da resposta
    } catch (err: unknown) {
      if(axios.isAxiosError(error)){
        const axiosError = err as AxiosError<ErrorRequestType>
        setError(axiosError.response?.data)
      }
      console.log(err)
    }
    console.log(values);
  }
  return (
    <div className="grid content-center min-h-full px-15">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 bg-slate-100 rounded-md px-10 py-4 min-w-80 mx-auto"
        >
          <FormLabel>Solicite uma Viagem</FormLabel>
          <FormField
            control={form.control}
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Id de Usuário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Endereço de partida" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Endereço de destino" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormDescription>{error.error_description}</FormDescription>}
          <Button type="submit">Solicitar</Button>
        </form>
      </Form>
    </div>
  );
}

export default RideRequest;

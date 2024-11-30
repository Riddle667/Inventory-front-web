import { Client } from "@/models";
import { ClientServicesImpl } from "@/services";
const { updateClient } = new ClientServicesImpl();

export const UpdateClientUseCase = async (client: Client, token: string) => {
  try {
    const response = await updateClient(client, token);

    console.log("Cliente actualizado con éxito:", response);
    return Promise.resolve(response);
  } catch (error) {
    console.error("Error en ClientServices:", error);
    return Promise.reject(error);
  }
};

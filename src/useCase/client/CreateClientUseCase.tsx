import { Client } from "@/models";
import { ClientServicesImpl } from "@/services";
const { createClient } = new ClientServicesImpl();


export const CreateClientUseCase = async (client: Client, token: string) => {
    try {
        const response = await createClient(client, token);
        console.log("CreateClientUseCase", client);
        console.log("response", response);
        return Promise.resolve(response);
    } catch (error) {
        console.error("Error en CreateClientUseCase:", error);
        return Promise.reject(error);
    }
}
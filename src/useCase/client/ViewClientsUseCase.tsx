import { ClientServicesImpl } from "@/services";
const { getClients } = new ClientServicesImpl();


export const ViewClientsUseCase = async (token: string) => {
    try {
        const response = await getClients(token);
        console.log("ViewClientsUseCase", response);
        return Promise.resolve(response);
    } catch (error) {
        console.error("Error en ViewClientsUseCase:", error);
        return Promise.reject(error);
    }
}
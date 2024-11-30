import { ClientServicesImpl } from "@/services"
const { getClient } = new ClientServicesImpl();

export const GetCLientUseCase = async (id: number, token: string) => {

    try {
        const response = getClient(id, token);
        return Promise.resolve(response);
        
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }

}
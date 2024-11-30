import { ClientServicesImpl } from "@/services";
const { addBlackList } = new ClientServicesImpl();


export const AddBlackListUseCase = async (id: number, token: string) => {

    try {
        const responce = await addBlackList(id, token);
        console.log("Cliente añadido a la lista negra.");
        return Promise.resolve(responce);
    } catch (error) {
        console.error("Error en AddBlackListUseCase:", error);
        return Promise.reject(error);
    }
}
import { ProductServicesImpl } from "@/services";
const { getProduct } = new ProductServicesImpl();

export const GetProductUseCase = async (id: number, token: string) => {
    try {
        const response = await getProduct(id, token);
        return Promise.resolve(response);
    } catch (error) {
        console.error("Error en GetProductUseCase:", error);
        return Promise.reject(error);
    }
}
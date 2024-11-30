import { ProductServicesImpl } from "@/services/product.services";
const { getProducts } = new ProductServicesImpl();

export const ViewProductsUseCase = async (token: string) => {
    try {
        const response = await getProducts(token);
        console.log("ViewProductsUseCase", response);
        return response;
    } catch (error) {
        console.error("Error en ViewProductsUseCase:", error);
        throw error;
    }
};
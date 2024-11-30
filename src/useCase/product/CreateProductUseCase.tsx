import { ProductServicesImpl } from "@/services/product.services";
const { createProduct } = new ProductServicesImpl();

export const CreateProductUseCase = async (name: string, description: string, price: number, stock: number, category_id: string, token: string) => {
    try {
        const response = await createProduct(name, description, price, stock, category_id, token);
        console.log("response", response);
        return Promise.resolve(response);
    } catch (error) {
        console.error("Error en CreateProductUseCase:", error);
        return Promise.reject(error);
    }
};
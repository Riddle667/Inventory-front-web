import { Product } from "@/models";
import { ProductServicesImpl } from "@/services";
const { updateProduct } = new ProductServicesImpl();


export const UpdateProductUseCase = async (product: Product, token: string) => {
    try  {
        const response = await updateProduct(product, token);
        console.log("response", response);
        return Promise.resolve(response);
    } catch (error) {
        console.error("Error en UpdateProductUseCase:", error);
        return Promise.reject(error);
    }
}
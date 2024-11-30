import { ProductServicesImpl } from "@/services"
const { deleteProduct } = new ProductServicesImpl()


export const DeleteProductUseCase = async (id: number, token: string) => {
    try{
        const {data} = await deleteProduct(id, token);
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error)
    }
}
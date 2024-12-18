import { OrderServiceImpl } from "@/services/order.service"
const { getOrder } = new OrderServiceImpl

export const GetOrderUseCase = async (id: number, token: string) => {
    try{
        const response = await getOrder(token, id);

        return Promise.resolve(response);
    } catch (error) {
        console.error("Error en GetOrderUseCase:", error);
        return Promise.reject(error);
    }

}

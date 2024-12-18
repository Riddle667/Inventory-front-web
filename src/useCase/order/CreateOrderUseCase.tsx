import { Order } from "@/models";
import { OrderServiceImpl } from "@/services/order.service";
const { createOrder } = new OrderServiceImpl();

export const CreateOrderUseCase = async (token: string, order: Order) => {
    try {
        const { data } = await createOrder(token, order);
        console.log("response", data);
        return Promise.resolve(data);
    } catch (error) {
        console.error("Error en CreateOrderUseCase:", error);
        return Promise.reject(error);
    }
}
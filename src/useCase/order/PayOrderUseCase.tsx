import { OrderServiceImpl } from "@/services/order.service";
const {payOrder, payInstallmentOrder} = new OrderServiceImpl

export const PayOrderUseCase = async (token: string, id: number) => {
    try {
        const response = await payOrder(token, id);
        return Promise.resolve(response);
    } catch (error) {
        console.error("Error en PayOrderUseCase:", error);
        return Promise.reject(error);
    }
}

export const PayInstallmentOrderUseCase = async (token: string, id: number, idInstallment: number) => {
    try {
        const response = await payInstallmentOrder(token, id, idInstallment);
        return Promise.resolve(response);
    } catch (error) {
        console.error("Error en PayInstallmentOrderUseCase:", error);
        return Promise.reject(error);
    }
}
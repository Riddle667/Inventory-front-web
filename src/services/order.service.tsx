import { Order } from "@/models";
import { api, ResponseAPI } from "@/utilities";
import { AxiosError } from "axios";


export interface OrderService {
    createOrder: (token: string, order: Order) => Promise<ResponseAPI>;
    getOrder: (token: string, id: number) => Promise<ResponseAPI>;
    getOrders: (token: string) => Promise<ResponseAPI>;
    updateOrder: (token: string, order: Order) => Promise<ResponseAPI>;
    deleteOrder: (token: string, id: number) => Promise<ResponseAPI>;
    payOrder: (token: string, id: number) => Promise<ResponseAPI>;
    payInstallmentOrder: (token: string, id: number, idInstallment: number) => Promise<ResponseAPI>;
}

export class OrderServiceImpl implements OrderService {
    async createOrder(token: string, order: Order): Promise<ResponseAPI> {
        try {
            const { data } = await api.post<ResponseAPI>("/order/create-order", order, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return Promise.resolve(data);
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            console.error("Error en createOrder:", error);
            return Promise.reject(e.response?.data);
        }
    }

    async getOrder(token: string, id: number): Promise<ResponseAPI> {
        try {
            const { data } = await api.get<ResponseAPI>(`/order/get-order/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            return Promise.reject(e.response?.data);
        }
    }

    async getOrders(token: string): Promise<ResponseAPI> {
        try {
            const { data } = await api.get<ResponseAPI>("/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            return Promise.reject(e.response?.data);
        }
    }

    async updateOrder(token: string, order: Order): Promise<ResponseAPI> {
        try {
            const { data } = await api.put<ResponseAPI>(`/orders/${order.id}`, order, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            return Promise.reject(e.response?.data);
        }
    }

    async deleteOrder(token: string, id: number): Promise<ResponseAPI> {
        try {
            const { data } = await api.delete<ResponseAPI>(`/orders/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            return Promise.reject(e.response?.data);
        }
    }

    async payOrder(token: string, id: number): Promise<ResponseAPI> {
        try {
            const { data } = await api.put<ResponseAPI>(`/order/pay-order/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            return Promise.reject(e.response?.data);
        }
    }

    async payInstallmentOrder(token: string, id: number, idInstallment: number): Promise<ResponseAPI> {
        try {
            const { data } = await api.put<ResponseAPI>(`/order/pay-installment-order/${id}/${idInstallment}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            const e = error as AxiosError & ResponseAPI;
            return Promise.reject(e.response?.data);
        }
    }
}
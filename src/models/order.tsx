import { Client } from "./client";
import { Installment } from "./installment";
import { OrderProduct } from "./orderProduct";

export interface Order {
    id: number;
    paid: boolean;
    total_price: number;
    pay_method: string;
    is_installment: boolean;
    client_id: number;
    createdAt?: Date;
    updatedAt?: Date;
    products: OrderProduct[];
    installments?: Installment[];
    client?:  Client;
}
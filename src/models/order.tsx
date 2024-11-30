import { Client } from "./client";
import { Installment } from "./installment";

export interface Order {
    id: number;
    paid: boolean;
    total_price: number;
    pay_method: string;
    date: string;
    is_installment: boolean;
    client_id: number;
    installments?: Installment[];
    client?:  Client;
}
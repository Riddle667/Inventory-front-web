import { Order } from "./order";

export interface Client{
    id: number;
    name: string;
    lastName: string;
    address: string;
    rut: string;
    phone: string;
    debt?: number;
    pay?: number;
    isBlackList: boolean;
    orders?: Order[];
}
import { User } from "./user";

export interface Alert {
    id: number;
    message: string;
    type: string;
    is_read: boolean;
    user_id: number;
    user: User;
    product_id: number;
    client_id: number;
    priority: string;
    createdAt: string;
    updatedAt: string;
}
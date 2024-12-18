import { Order } from "./order";
import { Product } from "./product";

export interface OrderProduct {
    id: number;
    product_id?: number;
    order_id?: number;
    quantity: number;
    total_price: number;
    product?: Product;
    order?: Order;
}
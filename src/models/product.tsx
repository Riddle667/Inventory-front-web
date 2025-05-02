import { Category } from "./category";
import { Image } from "./image";
import { OrderProduct } from "./orderProduct";

export interface Product{
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    is_active: boolean;
    category_id: string;
    category: Category;
    created_at: string;
    updated_at: string;
    images: Image[];
    orders: OrderProduct[];

}
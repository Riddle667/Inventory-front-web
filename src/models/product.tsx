import { Category } from "./category";
import { Image } from "./image";

export interface Product{
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category_id: string;
    category: Category;
    created_at: string;
    updated_at: string;
    images: Image[];

}
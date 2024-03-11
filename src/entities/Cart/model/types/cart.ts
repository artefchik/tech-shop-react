import { Product } from 'entities/Product';

export interface Cart {
    id: string;
    userId: string;
}

export interface CartItemType extends Product {
    count: number;
}
export interface CartSchema {
    data?: Cart;
    error?: string;
}

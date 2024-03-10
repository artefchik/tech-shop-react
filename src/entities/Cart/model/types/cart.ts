import { Product } from 'entities/Product';

export type ProductId = string;

export interface Cart {
    id: string;
    userId: string;
}

export interface CartSchema {
    data?: Cart;
    error?: string;
}

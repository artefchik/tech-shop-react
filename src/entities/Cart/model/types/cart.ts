import { Product } from 'entities/Product';
import { UserSchema } from 'entities/User';
import { EntityState } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';

export type ProductId = string;

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartSchema {
    itemsMap: Record<ProductId, CartItem>;
}

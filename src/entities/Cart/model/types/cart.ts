import { Product } from 'entities/Product';
import { UserSchema } from 'entities/User';
import { EntityState } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { Id } from '@reduxjs/toolkit/dist/query/tsHelpers';

export type ProductId = string;

export interface CartItemType extends Product {
    quantity: number;
}

export interface CartSchema extends EntityState<CartItemType> {
    userId?: string;
    isLoading?: boolean;
    error?: string;
}

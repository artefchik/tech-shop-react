import { EntityState } from '@reduxjs/toolkit';
import { Product } from 'entities/Product';
import { CartItemType } from 'entities/CartItem/model/types/cartItem';

export interface CartProductSchema extends EntityState<CartItemType> {
    isLoading?: boolean;
    error?: string;
}

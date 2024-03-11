import { EntityState } from '@reduxjs/toolkit';
import { CartItemType } from 'entities/Cart';

export interface CartProductSchema extends EntityState<CartItemType> {
    isLoading?: boolean;
    error?: string;
}

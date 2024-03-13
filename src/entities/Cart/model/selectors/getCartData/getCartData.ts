import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getCartData = (state: StateSchema) => state.cart.data;

export const getCartId = createSelector(getCartData, (cart) => cart?.id ?? '');

import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Product } from 'entities/Product';
import { User } from 'entities/User';
import { initCartData } from 'entities/Cart/model/services/initCartData/initCartData';
import { Cart, CartSchema } from '../types/cart';

const initialState: CartSchema = {
    data: undefined,
    error: undefined,
};

export const cartsSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initCartData.fulfilled, (state, action: PayloadAction<Cart>) => {
                state.data = action.payload;
            })
            .addCase(initCartData.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { actions: cartActions } = cartsSlice;
export const { reducer: cartReducer } = cartsSlice;

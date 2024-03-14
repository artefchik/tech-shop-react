import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initCartData } from '../services/initCartData/initCartData';
import { Cart, CartSchema } from '../types/cart';

const initialState: CartSchema = {
    data: undefined,
    error: undefined,
};

export const cartSlice = createSlice({
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

export const { actions: cartActions } = cartSlice;
export const { reducer: cartReducer } = cartSlice;

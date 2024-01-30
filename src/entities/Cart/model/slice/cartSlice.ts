import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { StateSchema } from 'app/providers/StoreProvider';
import { Product } from 'entities/Product';
import { CartItem, CartSchema } from '../types/cart';

const initialState: CartSchema = {
    itemsMap: {},
};

export const cartsSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addOneItem: (state, action: PayloadAction<Product>) => {
            const productInCart = state.itemsMap[action.payload.id];
            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                state.itemsMap[action.payload.id] = {
                    quantity: 1,
                    product: action.payload,
                };
            }
        },
        removeOneItem: (state, action: PayloadAction<Product>) => {
            const productInCart = state.itemsMap[action.payload.id];
            if (!productInCart) return;
            if (productInCart.quantity) {
                productInCart.quantity -= 1;
            } else {
                delete state.itemsMap[action.payload.id];
            }
        },
        removeItem: (state, action: PayloadAction<Product>) => {
            const productInCart = state.itemsMap[action.payload.id];
            if (!productInCart) return;
            delete state.itemsMap[action.payload.id];
        },
        clearCart: (state) => {
            state.itemsMap = {};
        },
    },
    extraReducers: (builder) => {},
});

export const { actions: cartActions } = cartsSlice;
export const { reducer: cartReducer } = cartsSlice;

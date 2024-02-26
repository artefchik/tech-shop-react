import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Product } from 'entities/Product';
import { User } from 'entities/User';
import { updateCart } from 'entities/Cart';
import { fetchCartProductsList } from '../services/fetchCartProductsList/fetchCartProductsList';
import { CartItemType, CartSchema } from '../types/cart';

const cartAdapter = createEntityAdapter<CartItemType>({
    selectId: (product: CartItemType) => product.id,
});

export const getCart = cartAdapter.getSelectors<StateSchema>(
    (state) => state.cart || cartAdapter.getInitialState(),
);

export const cartsSlice = createSlice({
    name: 'cart',
    initialState: cartAdapter.getInitialState<CartSchema>({
        ids: [],
        entities: {},
        userId: undefined,
    }),
    reducers: {
        setInitUserId: (state, action: PayloadAction<User>) => {
            state.userId = action.payload._id;
        },
        addItem: (state, action: PayloadAction<Product>) => {
            cartAdapter.setOne(state, {
                ...action.payload,
                quantity: 1,
            });
            // const productInCart = state.items.find(
            //     ({ product }) => product.id === action.payload.id,
            // );
            // if (productInCart) {
            //     productInCart.quantity += 1;
            // } else {
            //     state.items.push({
            //         product: action.payload,
            //         quantity: 1,
            //     });
            // }
        },

        addOneItem: (state, action: PayloadAction<CartItemType>) => {
            cartAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload,
            });
        },
        removeOneItem: (state, action: PayloadAction<CartItemType>) => {
            if (action.payload.quantity) {
                cartAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: action.payload,
                });
            } else {
                cartAdapter.removeOne(state, action.payload.id);
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            cartAdapter.removeOne(state, action.payload);
        },
        clearCart: (state) => {
            cartAdapter.removeAll(state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartProductsList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCartProductsList.fulfilled, (state, action) => {
                state.isLoading = false;
                cartAdapter.addMany(state, action.payload.products);
            })
            .addCase(fetchCartProductsList.rejected, (state, action) => {
                state.isLoading = false;
                // state.error = action.payload;
            });

        // .addCase(updateCart.pending, (state, action) => {
        //     state.error = undefined;
        //     state.isLoading = true;
        // })
        // .addCase(updateCart.fulfilled, (state, action) => {
        //     state.isLoading = false;
        // })
        // .addCase(updateCart.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // });
    },
});

export const { actions: cartActions } = cartsSlice;
export const { reducer: cartReducer } = cartsSlice;

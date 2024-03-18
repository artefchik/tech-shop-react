import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { CartItemType } from 'entities/Cart';
import { fetchCartProductsList } from 'features/CartProduct/model/services/fetchCartProductsList/fetchCartProductsList';
import { CartProductSchema } from '../types/CartProductSchema';

const cartAdapter = createEntityAdapter<CartItemType>({
    selectId: (basketItem: CartItemType) => basketItem.id,
});
export const getCartProducts = cartAdapter.getSelectors<StateSchema>(
    (state) => state.cartProducts || cartAdapter.getInitialState(),
);

export const cartProductsSlice = createSlice({
    name: 'cartProducts',
    initialState: cartAdapter.getInitialState<CartProductSchema>({
        ids: [],
        entities: {},
        isLoading: false,
    }),
    reducers: {
        addItem: (state, action) => {
            cartAdapter.setOne(state, { ...action.payload, count: 1 });
        },

        addOneItem: (state, action: PayloadAction<CartItemType>) => {
            cartAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload,
            });
        },
        removeOneItem: (state, action: PayloadAction<CartItemType>) => {
            if (action.payload.count) {
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
                cartAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCartProductsList.rejected, (state, action) => {
                state.isLoading = false;
                // state.error = action.payload;
            });
    },
});

export const { actions: cartProductsActions } = cartProductsSlice;
export const { reducer: cartProductsReducer } = cartProductsSlice;

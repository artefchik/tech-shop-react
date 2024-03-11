import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { CartItemType, getCartId } from 'entities/Cart';
import { fetchCartProductsList } from 'features/CartProduct/model/services/fetchCartProductsList/fetchCartProductsList';

export const addToProduct = createAsyncThunk<CartItemType, string, ThunkConfig<string>>(
    'cartProduct/addToProduct',
    async (productId, thunkAPI) => {
        const { getState, rejectWithValue, dispatch } = thunkAPI;

        const cartId = getCartId(getState());
        if (!cartId) {
            return rejectWithValue('error');
        }
        try {
            const response = await $api.post(`/basket/${cartId}`, {
                productId,
            });
            if (!response.data) {
                return rejectWithValue('error');
            }

            dispatch(fetchCartProductsList());
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);

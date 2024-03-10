import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { CartItemType } from 'entities/CartItem';
import { fetchCartProductsList } from '../fetchCartProductsList/fetchCartProductsList';

interface updateCartArg {
    basketId: string;
    productId: string;
}

export const addToProduct = createAsyncThunk<
    CartItemType,
    updateCartArg,
    ThunkConfig<string>
>('cartItem/addToProduct', async ({ productId, basketId }, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await $api.post(`/basket/${basketId}`, {
            productId,
        });
        if (!response.data) {
            return rejectWithValue('error');
        }

        dispatch(fetchCartProductsList(basketId));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

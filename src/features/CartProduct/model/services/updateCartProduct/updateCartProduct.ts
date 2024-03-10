import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { CartItemType } from 'entities/CartItem';
import { fetchCartProductsList } from '../fetchCartProductsList/fetchCartProductsList';

interface updateCartArg {
    basketId: string;
    count: number;
    productId: string;
}

export const updateCartProduct = createAsyncThunk<
    CartItemType,
    updateCartArg,
    ThunkConfig<string>
>('cartProduct/updateCartProduct', async ({ count, productId, basketId }, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await $api.patch(`/basket/${basketId}`, {
            productId,
            count,
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

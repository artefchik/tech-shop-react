import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { CartItemType } from 'entities/CartItem';

export const fetchCartProductsList = createAsyncThunk<
    CartItemType[],
    string,
    ThunkConfig<string>
>('cartProduct/fetchCartProductsList', async (cartId, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;
    try {
        const response = await $api.get(`/basket/${cartId}`);
        if (!response.data) {
            return rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

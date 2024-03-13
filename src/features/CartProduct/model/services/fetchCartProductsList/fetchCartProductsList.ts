import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { CartItemType, getCartId } from 'entities/Cart';

export const fetchCartProductsList = createAsyncThunk<
    CartItemType[],
    void,
    ThunkConfig<string>
>('cartProducts/fetchCartProductsList', async (_, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    const cartId = getCartId(getState());
    if (!cartId) {
        return rejectWithValue('error');
    }
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

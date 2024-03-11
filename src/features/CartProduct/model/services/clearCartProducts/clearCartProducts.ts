import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { CartItemType, getCartId } from 'entities/Cart';
import { fetchCartProductsList } from 'features/CartProduct/model/services/fetchCartProductsList/fetchCartProductsList';

export const clearCartProducts = createAsyncThunk<
    CartItemType,
    void,
    ThunkConfig<string>
>('cartProduct/clearCartProducts', async (_, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;
    const cartId = getCartId(getState());
    if (!cartId) {
        return rejectWithValue('error');
    }
    try {
        const response = await $api.delete(`/basket/${cartId}/all`, {});
        if (!response.data) {
            return rejectWithValue('error');
        }
        dispatch(fetchCartProductsList());
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

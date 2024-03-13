import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { CartItemType, getCartId } from 'entities/Cart';
import { fetchCartProductsList } from '../fetchCartProductsList/fetchCartProductsList';

interface updateCartArg {
    count: number;
    productId: string;
}

export const updateCartProduct = createAsyncThunk<
    CartItemType,
    updateCartArg,
    ThunkConfig<string>
>('cartProducts/updateCartProduct', async ({ count, productId }, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    const cartId = getCartId(getState());
    if (!cartId) {
        return rejectWithValue('error');
    }
    try {
        const response = await $api.patch(`/basket/${cartId}`, {
            productId,
            count,
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
});

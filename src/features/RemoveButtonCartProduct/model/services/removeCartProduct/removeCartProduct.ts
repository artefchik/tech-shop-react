import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { CartItemType } from 'entities/CartItem';
import { fetchCartProductsList } from 'features/CartProduct/model/services/fetchCartProductsList/fetchCartProductsList';

interface RemoveProductCartArg {
    basketId: string;
    productId: string;
}

export const removeCartProduct = createAsyncThunk<
    CartItemType,
    RemoveProductCartArg,
    ThunkConfig<string>
>('cartProduct/removeCartProduct', async ({ productId, basketId }, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await $api.delete(`/basket/${basketId}`, {
            params: {
                productId,
            },
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

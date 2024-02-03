import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { CartItemType } from 'entities/Cart/model/types/cart';
import { getCartProducts } from 'entities/Cart/model/selectors/getCartProducts/getCartProducts';

export const updateCart = createAsyncThunk<
    CartItemType,
    void,
    ThunkConfig<string>
>('user/initUserAuthData', async (_, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    const products = getCartProducts(getState());
    const userId = JSON.parse?.(
        localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    );
    try {
        if (!userId) {
            return rejectWithValue('error');
        }
        const response = await axios.patch<CartItemType>(
            `http://localhost:8000/cart/${userId}`,
            {
                userId,
                products,
            },
        );
        if (!response.data) {
            return rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

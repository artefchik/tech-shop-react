import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { Cart } from '../../types/cart';

interface updateCartArg {
    count: number;
    productId: string;
}

export const initCartData = createAsyncThunk<Cart, string, ThunkConfig<string>>(
    'cart/initCartData',
    async (userId, thunkAPI) => {
        const { getState, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await $api.get(`/basket/init/${userId}`);
            if (!response.data) {
                return rejectWithValue('error');
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);

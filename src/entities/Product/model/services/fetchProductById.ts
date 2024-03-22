import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'shared/api/api';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Product } from '../types/product';

export const fetchProductById = createAsyncThunk<
    Product,
    string,
    ThunkConfig<string>
>('productDetails/fetchProductById', async (productId, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;
    try {
        const response = await $api.get<Product>(`/products/${productId}`);
        if (!response.data) {
            return rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

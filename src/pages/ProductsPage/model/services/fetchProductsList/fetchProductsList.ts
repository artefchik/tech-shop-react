import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { Product } from 'entities/Product';

import { ThunkConfig } from 'app/providers/StoreProvider';

interface fetchProductsListProps {
    replace?: boolean;
}

export const fetchProductsList = createAsyncThunk<
    Product[],
    fetchProductsListProps,
    ThunkConfig<string>
>('articleDetails/fetchArticleById', async (_, thunkAPI) => {
    try {
        const response = await axios.get<Product[]>(
            `http://localhost:8000/products`,
        );
        if (!response.data) {
            return thunkAPI.rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue('error');
    }
});

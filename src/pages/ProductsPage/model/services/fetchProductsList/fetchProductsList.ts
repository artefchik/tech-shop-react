import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { Product } from 'entities/Product';

export const fetchProductsList = createAsyncThunk<
    Product[],
    string,
    {
        rejectValue: string;
    }
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

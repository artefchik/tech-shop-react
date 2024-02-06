import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { Product } from 'entities/Product';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { ProductsCategories } from 'shared/const/types';

interface fetchProductsListProps {
    replace?: boolean;
    category?: string;
}

export const fetchProductsList = createAsyncThunk<
    Product[],
    fetchProductsListProps,
    ThunkConfig<string>
>('articleDetails/fetchArticleById', async ({ category }, thunkAPI) => {
    try {
        const response = await axios.get<Product[]>(
            `http://localhost:8000/products`,
            {
                params: {
                    category:
                        category === ProductsCategories.ALL
                            ? undefined
                            : category,
                },
            },
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

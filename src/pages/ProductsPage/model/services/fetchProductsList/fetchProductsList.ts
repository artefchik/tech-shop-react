import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from 'entities/Product';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ProductsCategories } from 'shared/const/types';
import { $api } from 'shared/api/api';
import { getProductsListPage } from '../../selectors/getProductsListPage/getProductsListPage';
import { getProductsPageLimit } from '../../selectors/getProductsPageLimit/getProductsPageLimit';

interface fetchProductsListProps {
    replace?: boolean;
}

export const fetchProductsList = createAsyncThunk<
    Product[],
    fetchProductsListProps,
    ThunkConfig<string>
>('productsPage/fetchProductsList', async ({ replace }, thunkAPI) => {
    const { getState, dispatch, rejectWithValue } = thunkAPI;
    try {
        const limit = getProductsPageLimit(getState());
        const page = getProductsListPage(getState());

        const response = await $api.get<Product[]>(`/products`, {
            params: {
                // category: category === ProductsCategories.ALL ? undefined : category,
                page,
            },
        });
        if (!response.data) {
            return rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});

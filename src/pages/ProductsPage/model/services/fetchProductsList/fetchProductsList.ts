import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from 'entities/Product';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ProductsCategories } from 'shared/const/types';
import { $api } from 'shared/api/api';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import { getProductsFilterOrder } from 'features/ProductsFilter';
import { getProductsCategory } from 'pages/ProductsPage/model/selectors/getProductsCategory/getProductsCategory';
import { getProductsListPage } from '../../selectors/getProductsListPage/getProductsListPage';
import { getProductsPageLimit } from '../../selectors/getProductsPageLimit/getProductsPageLimit';

interface fetchProductsListProps {
    replace?: boolean;
}

export const fetchProductsList = createAsyncThunk<
    Product[],
    fetchProductsListProps,
    ThunkConfig<string>
>('productsPage/fetchProductsList', async (_, thunkAPI) => {
    const { getState, dispatch, rejectWithValue } = thunkAPI;

    const limit = getProductsPageLimit(getState());
    const page = getProductsListPage(getState());
    const order = getProductsFilterOrder(getState());
    const sort = getProductsFilterOrder(getState());
    const category = getProductsCategory(getState());
    try {
        addQueryParams({
            order,
        });
        const response = await $api.get<Product[]>(`/products`, {
            params: {
                category: category === ProductsCategories.ALL ? undefined : category,
                page,
                order,
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

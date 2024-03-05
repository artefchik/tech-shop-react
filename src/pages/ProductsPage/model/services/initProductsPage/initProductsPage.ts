import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ArticleType } from 'entities/Article';
import { articleFiltersActions, ArticleSortField } from 'features/ArticleFilters';
import { SortOrder } from 'shared/const/types';
import { getProductsInitiated } from '../../selectors/getProductsInitiated/getProductsInitiated';
import { productsPageActions } from '../../slice/productsPageSlice';
import { fetchProductsList } from '../../services/fetchProductsList/fetchProductsList';

export const initProductsPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('productsPage/initProductsPage', async (searchParams, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;
    const initiated = getProductsInitiated(getState());
    if (!initiated) {
        const order = searchParams.get('order') as SortOrder;
        if (order) {
            dispatch(articleFiltersActions.setOrder(order));
        }
        dispatch(productsPageActions.initState());
        dispatch(fetchProductsList({}));
    }
});

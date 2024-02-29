import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProductsPageHasMore } from '../../selectors/getProductsPageHasMore/getProductsPageHasMore';
import { getProductsListPage } from '../../selectors/getProductsListPage/getProductsListPage';
import { getProductsPageIsLoading } from '../../selectors/getProductsPageIsLoading/getProductsPageIsLoading';
import { productsPageActions } from '../../slice/productsPageSlice';
import { fetchProductsList } from '../../services/fetchProductsList/fetchProductsList';

export const fetchProductsNextPage = createAsyncThunk<
    void,
    string | undefined,
    ThunkConfig<string>
>('productsPage/fetchProductsNextPage', async (category, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;
    const hasMore = getProductsPageHasMore(getState());
    const page = getProductsListPage(getState());
    const isLoading = getProductsPageIsLoading(getState());
    if (hasMore && !isLoading) {
        dispatch(productsPageActions.setPage(page + 1));
        dispatch(fetchProductsList({}));
    }
});

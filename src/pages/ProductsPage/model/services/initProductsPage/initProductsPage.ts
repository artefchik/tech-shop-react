import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProductsInitiated } from '../../selectors/getProductsInitiated/getProductsInitiated';
import { productsPageActions } from '../../slice/productsPageSlice';
import { fetchProductsList } from '../../services/fetchProductsList/fetchProductsList';

export const initProductsPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'productsPage/fetchProductsNextPage',
    async (_, thunkAPI) => {
        const { getState, dispatch } = thunkAPI;
        const initiated = getProductsInitiated(getState());
        if (!initiated) {
            dispatch(productsPageActions.initState());
            dispatch(fetchProductsList({}));
        }
    },
);

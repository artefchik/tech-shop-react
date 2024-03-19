import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { FavoriteProduct } from 'features/ProductFavoriteButton/model/types/favorite';
import { $api } from 'shared/api/api';
import { getFavoriteData } from 'entities/Favorite/model/selectors/getFavoriteData/getFavoriteData';
import { Product } from 'entities/Product';

export const fetchFavorites = createAsyncThunk<
    Product[],
    void,
    ThunkConfig<string>
>('productFavorites/fetchFavorites', async (_, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const favorite = getFavoriteData(getState());
        if (!favorite) {
            return rejectWithValue('error');
        }
        const response = await $api.get(`/favorites/products/${favorite.id}`);

        if (!response.data) {
            return rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

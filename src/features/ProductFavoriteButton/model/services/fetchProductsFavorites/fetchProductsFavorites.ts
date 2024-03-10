import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { FavoriteProduct } from 'features/ProductFavoriteButton/model/types/favorite';
import { $api } from 'shared/api/api';
import { getFavoriteData } from 'entities/Favorite/model/selectors/getFavoriteData/getFavoriteData';

export const fetchProductsFavorites = createAsyncThunk<
    FavoriteProduct[],
    void,
    ThunkConfig<string>
>('productFavorites/fetchProductsFavorites', async (_, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    const favorite = getFavoriteData(getState());
    if (!favorite) {
        return rejectWithValue('error');
    }

    try {
        const response = await $api.get(`/favorites/${favorite.id}`);

        if (!response.data) {
            return rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { FavoriteProduct } from 'features/ProductFavoriteButton/model/types/favorite';
import { $api } from 'shared/api/api';
import { fetchProductsFavorites } from 'features/ProductFavoriteButton/model/services/fetchProductsFavorites/fetchProductsFavorites';
import { getFavoriteData } from 'entities/Favorite/model/selectors/getFavoriteData/getFavoriteData';

interface fetchArticleListProps {
    replace?: boolean;
}

export const toggleProductsFavorites = createAsyncThunk<
    FavoriteProduct[],
    string,
    ThunkConfig<string>
>('productFavorites/toggleProductsFavorites', async (productId, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;
    const favorite = getFavoriteData(getState());
    if (!favorite) {
        return rejectWithValue('error');
    }
    try {
        const response = await $api.post(`/favorites/${favorite.id}`, {
            productId,
        });
        if (!response.data) {
            return rejectWithValue('error');
        }
        dispatch(fetchProductsFavorites());
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

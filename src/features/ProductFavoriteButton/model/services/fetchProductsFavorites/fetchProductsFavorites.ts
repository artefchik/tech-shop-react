import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { FavoriteType } from 'features/ProductFavoriteButton/model/types/favorite';
import { getUserAuthData } from 'entities/User';

interface fetchArticleListProps {
    replace?: boolean;
}

export const fetchProductsFavorites = createAsyncThunk<
    FavoriteType,
    void,
    ThunkConfig<string>
>('productFavorites/fetchProductsFavorites', async (_, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;
    const authData = getUserAuthData(getState());
    if (!authData?.id) {
        return rejectWithValue('error');
    }

    try {
        const response = await axios.get<FavoriteType>(
            `http://localhost:8000/product-favorites/${authData?.id}`,
        );
        if (!response.data) {
            return rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
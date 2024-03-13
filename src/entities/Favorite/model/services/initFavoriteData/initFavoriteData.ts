import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { Favorite } from 'entities/Favorite/model/types/FavoriteSchema';
import { getUserAuthData } from 'entities/User';

interface fetchArticleListProps {
    replace?: boolean;
}

export const initFavoriteData = createAsyncThunk<Favorite, string, ThunkConfig<string>>(
    'favorite/initFavoriteData',
    async (userId, thunkAPI) => {
        const { getState, rejectWithValue, dispatch } = thunkAPI;
        try {
            const response = await $api.get<Favorite>(`/favorites/init/${userId}`);
            if (!response.data) {
                return rejectWithValue('error');
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);

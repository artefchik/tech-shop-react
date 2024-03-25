import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { Article } from 'entities/Article';

interface FetchOfferedArticlesArg {
    userId?: string;
}

export const fetchOfferedArticles = createAsyncThunk<
    Article[],
    FetchOfferedArticlesArg,
    ThunkConfig<string>
>('offeredArticlesPage/fetchOfferedArticles', async ({ userId }, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await $api.get(`/sandbox-articles`, {
            params: {
                userId,
            },
        });
        if (!response.data) {
            return rejectWithValue('error');
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

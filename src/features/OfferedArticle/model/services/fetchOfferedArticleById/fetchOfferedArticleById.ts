import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { Article } from 'entities/Article';

export const fetchOfferedArticleById = createAsyncThunk<
    Article,
    string,
    ThunkConfig<string>
>('offeredArticle/fetchOfferedArticleById', async (id, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await $api.get<Article>(`/sandbox-articles/${id}`, {});
        if (!response.data) {
            return rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

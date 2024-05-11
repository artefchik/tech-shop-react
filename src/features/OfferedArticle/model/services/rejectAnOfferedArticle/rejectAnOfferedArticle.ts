import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { Article } from 'entities/Article';

interface rejectAnOfferedArticleArg {
    id: string;
    text: string;
}

export const rejectAnOfferedArticle = createAsyncThunk<
    Article,
    rejectAnOfferedArticleArg,
    ThunkConfig<string>
>('offeredArticle/rejectAnOfferedArticle', async ({ id, text }, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await $api.post<Article>(
            `/sandbox-articles/reject/${id}`,
            { text },
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

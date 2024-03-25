import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { Article } from 'entities/Article';

export const publishAnOfferedArticle = createAsyncThunk<
    Article,
    string,
    ThunkConfig<string>
>('offeredArticle/publishAnOfferedArticle', async (id, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await $api.post<Article>(
            `/sandbox-articles/${id}`,
            {},
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

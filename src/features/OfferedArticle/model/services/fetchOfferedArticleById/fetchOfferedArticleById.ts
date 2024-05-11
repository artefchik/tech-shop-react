import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { Article } from 'entities/Article';
import { OfferedArticle } from 'features/OfferedArticle/model/types/OfferedArticleDetailsSchema';

export const fetchOfferedArticleById = createAsyncThunk<
    Article,
    string,
    ThunkConfig<string>
>('offeredArticle/fetchOfferedArticleById', async (id, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await $api.get<OfferedArticle>(
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

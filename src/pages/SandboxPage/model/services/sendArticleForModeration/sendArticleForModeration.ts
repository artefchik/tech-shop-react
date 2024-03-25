import { createAsyncThunk } from '@reduxjs/toolkit';

import { Article } from 'entities/Article';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { getSandboxArticle } from 'pages/SandboxPage/model/selectors/getSandboxArticleForSend/getSandboxArticleForSend';

export const sendArticleForModeration = createAsyncThunk<
    Article,
    void,
    ThunkConfig<string>
>('sandboxSettings/sendArticleForModeration', async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
        const data = getSandboxArticle(getState());

        const response = await $api.post<Article>(`/sandbox-articles`, data);
        if (!response.data) {
            return rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

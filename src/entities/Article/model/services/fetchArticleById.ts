import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { $api } from 'shared/api/api';
import { Article } from '../types/article';

export const fetchArticleById = createAsyncThunk<
    Article,
    string,
    {
        rejectValue: string;
    }
>('articleDetails/fetchArticleById', async (articleId, thunkAPI) => {
    try {
        const response = await $api.get<Article>(`/articles/${articleId}`, {
            params: {
                _expand: 'user',
            },
        });
        if (!response.data) {
            return thunkAPI.rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue('error');
    }
});

import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { $api } from 'shared/api/api';
import { User } from 'entities/User';
import { Article } from '../types/article';

interface ArticleResponse {
    article: Article;
    user: User;
}

export const fetchArticleById = createAsyncThunk<
    Article,
    string,
    {
        rejectValue: string;
    }
>('articleDetails/fetchArticleById', async (articleId, thunkAPI) => {
    try {
        const response = await $api.get<ArticleResponse>(`/articles/${articleId}`, {});
        if (!response.data) {
            return thunkAPI.rejectWithValue('error');
        }
        return { ...response.data.article, user: response.data.user };
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue('error');
    }
});

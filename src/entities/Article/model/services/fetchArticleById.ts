import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { Article } from '../types/article';

export const fetchArticleById = createAsyncThunk<Article, string, {
  rejectValue: string
}>(
    'articleDetails/fetchArticleById',
    async (articleId, thunkAPI) => {
        try {
            const response = await axios.get<Article>(`http://localhost:8000/articles/${articleId}`, {
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
    },
);

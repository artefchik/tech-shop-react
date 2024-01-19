import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { Article } from 'entities/Article';

export const fetchArticleList = createAsyncThunk<Article[], void, {
  rejectValue: string
}>(
    'articlesPage/fetchArticleList',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<Article[]>('http://localhost:8000/articles', {
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

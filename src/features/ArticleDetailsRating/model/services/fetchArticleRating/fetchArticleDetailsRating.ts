import { createAsyncThunk } from '@reduxjs/toolkit';

import { Profile } from 'entities/Profile';
import { $api } from 'shared/api/api';
import { ArticleRating } from '../../types/articleRating';

export const fetchArticleDetailsRating = createAsyncThunk<
    ArticleRating,
    string,
    {
        rejectValue: string;
    }
>(
    'articleDetailsRating/fetchArticleDetailsRating',
    async (articleId, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await $api.get<ArticleRating>(
                `/articles/rating/${articleId}`,
            );
            if (!response.data) {
                return rejectWithValue('error');
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);

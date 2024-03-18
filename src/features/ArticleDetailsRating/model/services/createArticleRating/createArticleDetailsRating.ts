import { createAsyncThunk } from '@reduxjs/toolkit';

import { $api } from 'shared/api/api';
import { getUserAuthData } from 'entities/User';
import { ArticleRating } from '../../types/articleRating';

export const createArticleDetailsRating = createAsyncThunk<
    ArticleRating,
    ArticleRating,
    {
        rejectValue: string;
    }
>(
    'articleDetailsRating/createArticleDetailsRating',
    async (ratingData, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;
        try {
            const response = await $api.post<ArticleRating>(
                `/articles/rating/${ratingData.articleId}`,
                ratingData,
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleRating } from '../types/articleRating';
import { ArticleDetailsRatingSchema } from '../types/ArticleDetailsRatingSchema';
import { fetchArticleDetailsRating } from '../services/fetchArticleRating/fetchArticleDetailsRating';

const initialState: ArticleDetailsRatingSchema = {
    data: {
        articleId: '',
        userId: '',
        rate: 0,
        feedback: '',
    },
    isLoading: false,
    error: '',
};

export const articleDetailsRatingSlice = createSlice({
    name: 'articleDetailsRating',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleDetailsRating.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchArticleDetailsRating.fulfilled,
                (state, action: PayloadAction<ArticleRating>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchArticleDetailsRating.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleDetailsRatingActions } =
    articleDetailsRatingSlice;
export const { reducer: articleDetailsRatingReducer } =
    articleDetailsRatingSlice;

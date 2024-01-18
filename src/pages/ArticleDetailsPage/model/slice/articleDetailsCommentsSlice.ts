import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import { CommentType } from 'entities/Comment';
import {
    fetchCommentsByArticleId,
} from '../services/fetchCommentByArticleId/fetchCommentByArticleId';

const initialState: ArticleDetailsCommentsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsComments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<CommentType[]>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleDetailsCommentsActions } = articleDetailsCommentsSlice;
export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;

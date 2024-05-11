import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { OfferedArticle } from 'features/OfferedArticle';
import { OfferedArticlesPageSchema } from '../types/OfferedArticlesPageSchema';
import { fetchOfferedArticles } from '../services/fetchOfferedArticles/fetchOfferedArticles';

const initialState: OfferedArticlesPageSchema = {
    data: undefined,
    isLoading: false,
    error: '',
};

export const offeredArticlesPageSlice = createSlice({
    name: 'offeredArticlesPage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOfferedArticles.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchOfferedArticles.fulfilled,
                (state, action: PayloadAction<OfferedArticle[]>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchOfferedArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: offeredArticlesPageActions } = offeredArticlesPageSlice;
export const { reducer: offeredArticlesPageReducer } = offeredArticlesPageSlice;

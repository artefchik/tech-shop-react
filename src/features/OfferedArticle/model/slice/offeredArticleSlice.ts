import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { fetchOfferedArticleById } from '../services/fetchOfferedArticleById/fetchOfferedArticleById';
import { OfferedArticleDetailsSchema } from '../types/OfferedArticleDetailsSchema';

const initialState: OfferedArticleDetailsSchema = {
    data: undefined,
    isLoading: false,
    error: '',
};

export const offeredArticleDetailsSlice = createSlice({
    name: 'offeredArticleDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOfferedArticleById.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchOfferedArticleById.fulfilled,
                (state, action: PayloadAction<Article>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchOfferedArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: offeredArticleDetailsActions } =
    offeredArticleDetailsSlice;
export const { reducer: offeredArticleDetailsReducer } =
    offeredArticleDetailsSlice;

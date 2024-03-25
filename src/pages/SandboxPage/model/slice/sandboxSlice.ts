import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendArticleForModeration } from 'pages/SandboxPage/model/services/sendArticleForModeration/sendArticleForModeration';
import { Article } from 'entities/Article';
import { SandboxPageSchema } from '../types/SandboxPageSchema';

const initialState: SandboxPageSchema = {
    data: undefined,
    isLoading: false,
    error: '',
};

export const sandboxPageSlice = createSlice({
    name: 'sandboxSettings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendArticleForModeration.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                sendArticleForModeration.fulfilled,
                (state, action: PayloadAction<Article>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(sendArticleForModeration.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: sandboxPageActions } = sandboxPageSlice;
export const { reducer: sandboxPageReducer } = sandboxPageSlice;

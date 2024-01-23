import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleType } from 'entities/Article';
import { SortOrder } from 'shared/const/types';
import { ArticleFiltersSchema } from '../types/ArticleFiltersSchema';
import { ArticleSortField } from '../types/filters';

const initialState: ArticleFiltersSchema = {
    search: '',
    sort: ArticleSortField.CREATED,
    type: ArticleType.ALL,
    order: SortOrder.ASK,
};

export const articleFiltersSlice = createSlice({
    name: 'articleFilters',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
    },
    extraReducers: (builder) => {
    },
});

export const { actions: articleFiltersActions } = articleFiltersSlice;
export const { reducer: articleFiltersReducer } = articleFiltersSlice;

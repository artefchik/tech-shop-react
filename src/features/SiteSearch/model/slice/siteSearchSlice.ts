import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SiteSearchSchema } from '../types/search';

const initialState:SiteSearchSchema = {
    text: undefined,
    error: undefined,
    isLoading: false,
};

export const siteSearchSlice = createSlice({
    name: 'siteSearchSlice',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
});

export const { actions: siteSearchSliceActions } = siteSearchSlice;
export const { reducer: siteSearchSliceReducer } = siteSearchSlice;

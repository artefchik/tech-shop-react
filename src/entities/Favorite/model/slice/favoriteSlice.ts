import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initFavoriteData } from 'entities/Favorite/model/services/initFavoriteData/initFavoriteData';
import { Favorite, FavoriteSchema } from '../types/FavoriteSchema';

const initialState: FavoriteSchema = {
    data: undefined,
    error: undefined,
};

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setLogout: (state) => {
            state.data = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initFavoriteData.fulfilled, (state, action) => {
                state.data = action.payload;
                // state._mounted = true;
            })
            .addCase(initFavoriteData.rejected, (state, action) => {
                state.error = action.payload;
                // state._mounted = true;
            });
    },
});

export const { actions: favoriteActions } = favoriteSlice;
export const { reducer: favoriteReducer } = favoriteSlice;

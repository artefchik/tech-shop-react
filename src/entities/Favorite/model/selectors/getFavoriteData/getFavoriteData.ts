import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getFavoriteData = (state: StateSchema) => state.favorite.data;

export const getFavoriteDataId = createSelector(
    getFavoriteData,
    (favorite) => favorite?.id,
);

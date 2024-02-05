import { EntityState } from '@reduxjs/toolkit';

export interface FavoriteProduct {
    id: string;
    productId: string;
    isFavorite: boolean;
}

export interface FavoriteType {
    favorites: FavoriteProduct[];
    userId?: string;
}
export interface ProductFavoritesSchema extends EntityState<FavoriteProduct> {
    isLoading: boolean;
    error?: string;
}

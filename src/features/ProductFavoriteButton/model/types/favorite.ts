import { EntityState } from '@reduxjs/toolkit';

export interface FavoriteProduct {
    id: string;
    favoriteId: string;
    productId: string;
}

export interface FavoriteType {
    favorites: FavoriteProduct[];
}
export interface ProductFavoritesSchema extends EntityState<FavoriteProduct> {
    isLoading: boolean;
    error?: string;
}

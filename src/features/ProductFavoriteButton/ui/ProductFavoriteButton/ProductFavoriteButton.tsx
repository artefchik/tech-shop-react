import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { FavoriteButton } from 'entities/Favorite/ui/FavoriteButton/FavoriteButton';
import {
    getProductFavorites,
    productFavoritesActions,
    productFavoritesReducer,
} from 'features/ProductFavoriteButton/model/slice/productFavoritesSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { StateSchema } from 'app/providers/StoreProvider';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { toggleProductsFavorites } from '../../model/services/toggleProductsFavorites/toggleProductsFavorites';

interface ProductFavoriteButtonProps {
    className?: string;
    productId: string;
    isFavorite?: boolean;
}

const reducers: ReducersList = {
    productFavorites: productFavoritesReducer,
};

export const ProductFavoriteButton = (props: ProductFavoriteButtonProps) => {
    const { className, productId, isFavorite } = props;
    const dispatch = useAppDispatch();

    const favoriteItem = useSelector((state: StateSchema) =>
        getProductFavorites.selectById(state, productId),
    );
    const onToggleFavorite = useCallback(() => {
        dispatch(toggleProductsFavorites(productId));
        if (favoriteItem) {
            dispatch(productFavoritesActions.onToggleFavorite(favoriteItem));
        }
    }, [dispatch, favoriteItem, productId]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <FavoriteButton
                isFavorite={Boolean(favoriteItem)}
                onToggleFavorite={onToggleFavorite}
            />
        </DynamicModuleLoader>
    );
};

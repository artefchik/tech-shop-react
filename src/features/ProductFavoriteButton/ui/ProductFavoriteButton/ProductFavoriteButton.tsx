import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { FavoriteButton } from 'entities/Favorite/ui/FavoriteButton/FavoriteButton';
import {
    getProductFavorites,
    productFavoritesActions,
} from 'features/ProductFavoriteButton/model/slice/productFavoritesSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { StateSchema } from 'app/providers/StoreProvider';

interface ProductFavoriteButtonProps {
    className?: string;
    isFavorite?: boolean;
    productId: string;
}

export const ProductFavoriteButton = (props: ProductFavoriteButtonProps) => {
    const { className, isFavorite, productId } = props;
    const dispatch = useAppDispatch();

    const onToggleFavorite = useCallback(
        (isFav: boolean) => {
            dispatch(
                productFavoritesActions.onToggleFavorite({
                    productId,
                    isFavorite: isFav,
                    id: productId,
                }),
            );
        },
        [dispatch, productId],
    );

    return (
        <FavoriteButton
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
        />
    );
};

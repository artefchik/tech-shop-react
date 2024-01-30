import { useCallback, useEffect, useState } from 'react';
import {
    useChangeProductFavorite,
    useGetProductFavorite,
} from 'features/ProductFavoriteButton/api/productFavoriteApi';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { FavoriteButton } from 'entities/Favorite/ui/FavoriteButton/FavoriteButton';

interface ProductFavoriteButtonProps {
    className?: string;
    productId: string;
}

export const ProductFavoriteButton = (props: ProductFavoriteButtonProps) => {
    const { className, productId } = props;
    const userData = useSelector(getUserAuthData);
    const { data, isLoading } = useGetProductFavorite({
        productId,
        userId: userData?.id ?? '',
    });

    const [toggleProductFavorite] = useChangeProductFavorite();

    const onToggleFavorite = useCallback(
        (isFavorite: boolean) => {
            try {
                toggleProductFavorite({
                    productId,
                    userId: userData?.id ?? '',
                    isFavorite,
                });
            } catch (e) {
                console.log(e);
            }
        },
        [productId, toggleProductFavorite, userData?.id],
    );
    const fav = data?.[0];

    if (isLoading) {
        return null;
    }
    return (
        <FavoriteButton
            onToggleFavorite={onToggleFavorite}
            isFavorite={fav?.isFavorite}
        />
    );
};

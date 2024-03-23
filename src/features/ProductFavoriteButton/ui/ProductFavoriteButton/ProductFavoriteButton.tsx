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
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import { Modal } from 'shared/ui/Modal/Modal';
import { VStack } from 'shared/ui/Stack';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { getRoutePathAuth } from 'shared/const/router';
import { useTranslation } from 'react-i18next';
import { use } from 'i18next';
import { toggleProductsFavorites } from '../../model/services/toggleProductsFavorites/toggleProductsFavorites';

interface ProductFavoriteButtonProps {
    className?: string;
    productId: string;
}

const reducers: ReducersList = {
    productFavorites: productFavoritesReducer,
};

export const ProductFavoriteButton = (props: ProductFavoriteButtonProps) => {
    const { className, productId } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const userData = useSelector(getUserAuthData);
    const { isOpenModal, onShowModal, onCloseModal } = useToggleModal();
    const favoriteItem = useSelector((state: StateSchema) =>
        getProductFavorites.selectById(state, productId),
    );
    const onToggleFavorite = useCallback(() => {
        if (!userData?.id) {
            onShowModal();
        } else {
            dispatch(toggleProductsFavorites(productId));
            if (favoriteItem) {
                dispatch(
                    productFavoritesActions.onToggleFavorite(favoriteItem),
                );
            }
        }
    }, [dispatch, favoriteItem, onShowModal, productId, userData?.id]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <>
                <Modal isOpen={isOpenModal} lazy onClose={onCloseModal}>
                    <VStack align="center" gap="5">
                        <Text
                            text={t(
                                'Only authorized users can add products to favorites',
                            )}
                            align={TextAlign.CENTER}
                        />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            to={getRoutePathAuth()}
                        >
                            {t('Sign Up')}
                        </AppLink>
                    </VStack>
                </Modal>
                <FavoriteButton
                    isFavorite={Boolean(favoriteItem)}
                    onToggleFavorite={onToggleFavorite}
                    auth={Boolean(userData?.id)}
                />
            </>
        </DynamicModuleLoader>
    );
};

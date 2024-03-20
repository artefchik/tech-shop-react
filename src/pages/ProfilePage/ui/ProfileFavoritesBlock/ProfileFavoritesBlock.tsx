import { VirtuosoGrid } from 'react-virtuoso';
import { ProductCardSkeleton } from 'entities/Product';
import { ViewType } from 'shared/const/types';
import { ProductItem } from 'widgets/ProductItem';
import { useSelector } from 'react-redux';
import {
    fetchFavorites,
    getFavoritesItems,
    productFavoritesReducer,
} from 'features/ProductFavoriteButton';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useEffect } from 'react';
import { ProductListSkeleton } from 'entities/Product/ui/ProductList/ProductListSkeleton';
import { getProductFavoritesIsLoading } from 'features/ProductFavoriteButton/model/selectors/getProductFavoritesIsLoading/getProductFavoritesIsLoading';
import { EmptySearch } from 'shared/ui/EmptySearch/EmptySearch';
import { useTranslation } from 'react-i18next';
import cls from './ProfileFavoritesBlock.module.scss';

interface ProfileFavoritesBlockProps {
    className?: string;
}

const reducers: ReducersList = {
    productFavorites: productFavoritesReducer,
};

export const ProfileFavoritesBlock = (props: ProfileFavoritesBlockProps) => {
    const { className } = props;
    const favorites = useSelector(getFavoritesItems);
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getProductFavoritesIsLoading);
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.ProfileFavoritesBlock}>
                {isLoading && (
                    <ProductListSkeleton
                        view={ViewType.SMALL}
                        className={cls.wrapper}
                    />
                )}
                {!favorites.length && (
                    <EmptySearch text={t('Nothing was found')} />
                )}
                <VirtuosoGrid
                    totalCount={favorites?.length}
                    data={favorites}
                    useWindowScroll
                    components={{
                        ScrollSeekPlaceholder: () => (
                            <ProductCardSkeleton view={ViewType.SMALL} />
                        ),
                    }}
                    listClassName={cls.wrapper}
                    itemContent={(index) => (
                        <ProductItem
                            product={favorites[index]}
                            view={ViewType.SMALL}
                        />
                    )}
                    scrollSeekConfiguration={{
                        enter: (velocity) => Math.abs(velocity) > 200,
                        exit: (velocity) => Math.abs(velocity) < 50,
                    }}
                />
            </div>
        </DynamicModuleLoader>
    );
};

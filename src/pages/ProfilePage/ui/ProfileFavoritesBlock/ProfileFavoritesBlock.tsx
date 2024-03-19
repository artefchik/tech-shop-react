import { classNames } from 'shared/lib/classNames/classNames';
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

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);
    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.ProfileFavoritesBlock}>
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

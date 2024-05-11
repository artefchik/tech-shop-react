import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProducts } from 'pages/ProductsPage/model/slice/productsPageSlice';
import { ViewType } from 'shared/const/types';
import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { ProductItem } from 'widgets/ProductItem';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { fetchProductsFavorites } from 'features/ProductFavoriteButton';
import { ProductCardSkeleton } from 'entities/Product';
import { ProductListSkeleton } from 'entities/Product/ui/ProductList/ProductListSkeleton';
import { EmptySearch } from 'shared/ui/EmptySearch/EmptySearch';
import { useTranslation } from 'react-i18next';
import { getRoutePathMain } from 'shared/const/router';
import { fetchProductsNextPage } from '../../model/services/fetchProductsNextPage/fetchProductsNextPage';
import cls from './ProductsPageInfiniteList.module.scss';
import { getProductsPageIsLoading } from '../../model/selectors/getProductsPageIsLoading/getProductsPageIsLoading';
import { getProductsPageView } from '../../model/selectors/getProductsPageView/getProductsPageView';

interface ArticlesInfiniteListProps {
    className?: string;
}

export const ProductsPageInfiniteList = (props: ArticlesInfiniteListProps) => {
    const { className } = props;
    const products = useSelector(getProducts.selectAll);
    const productsLength = useSelector(getProducts.selectTotal);
    const isLoading = useSelector(getProductsPageIsLoading);
    const view = useSelector(getProductsPageView);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchProductsFavorites());
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchProductsNextPage());
    }, [dispatch]);

    if (isLoading) {
        return <ProductListSkeleton view={view} />;
    }

    if (!productsLength) {
        return (
            <EmptySearch
                text={t('Nothing was found')}
                to={getRoutePathMain()}
                labelLink={t('Home')}
            />
        );
    }

    if (view === ViewType.BIG) {
        return (
            <Virtuoso
                context={{ isLoading }}
                className={className}
                useWindowScroll
                totalCount={productsLength}
                data={products}
                endReached={onLoadNextPart}
                components={{
                    Footer: () =>
                        isLoading ? (
                            <ProductListSkeleton view={ViewType.BIG} />
                        ) : null,
                    ScrollSeekPlaceholder: () => (
                        <ProductCardSkeleton view={ViewType.BIG} />
                    ),
                }}
                itemContent={(index) => (
                    <ProductItem
                        product={products[index]}
                        view={ViewType.BIG}
                        className={cls.bigCard}
                    />
                )}
                scrollSeekConfiguration={{
                    enter: (velocity) => Math.abs(velocity) > 200,
                    exit: (velocity) => Math.abs(velocity) < 50,
                }}
            />
        );
    }

    return (
        <VirtuosoGrid
            context={{ isLoading }}
            className={className}
            totalCount={productsLength}
            initialItemCount={5}
            data={products}
            useWindowScroll
            endReached={onLoadNextPart}
            components={{
                ScrollSeekPlaceholder: () => (
                    <ProductCardSkeleton view={ViewType.SMALL} />
                ),
            }}
            listClassName={cls.wrapper}
            itemContent={(index) => (
                <ProductItem product={products[index]} view={ViewType.SMALL} />
            )}
            scrollSeekConfiguration={{
                enter: (velocity) => Math.abs(velocity) > 200,
                exit: (velocity) => Math.abs(velocity) < 50,
            }}
        />
    );
};

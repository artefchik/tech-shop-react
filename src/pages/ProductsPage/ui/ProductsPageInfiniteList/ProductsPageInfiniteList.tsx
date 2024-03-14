import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from 'entities/Product/ui/ProductList/ProductList.module.scss';
import { ProductCardSkeleton } from 'entities/Product/ui/ProductCard/ProductCardSkeleton';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProducts } from 'pages/ProductsPage/model/slice/productsPageSlice';
import { ViewType } from 'shared/const/types';
import { useEffect } from 'react';
import { fetchProductsFavorites } from 'features/ProductFavoriteButton/model/services/fetchProductsFavorites/fetchProductsFavorites';
import { getProductFavoritesIsLoading } from 'features/ProductFavoriteButton/model/selectors/getProductFavoritesIsLoading/getProductFavoritesIsLoading';
import { ProductItem } from 'widgets/ProductItem';
import { getProductsPageIsLoading } from '../../model/selectors/getProductsPageIsLoading/getProductsPageIsLoading';
import { getProductsPageView } from '../../model/selectors/getProductsPageView/getProductsPageView';

interface ArticlesInfiniteListProps {
    className?: string;
}
const getSkeletons = (view: ViewType) =>
    new Array(view === ViewType.SMALL ? 5 : 3)
        .fill(0)
        .map((item, index) => <ProductCardSkeleton key={index} />);

export const ProductsPageInfiniteList = (props: ArticlesInfiniteListProps) => {
    const { className } = props;
    const products = useSelector(getProducts.selectAll);
    const isLoading = useSelector(getProductsPageIsLoading);
    const view = useSelector(getProductsPageView);
    const dispatch = useAppDispatch();
    const favoritesIsLoading = useSelector(getProductFavoritesIsLoading);

    useEffect(() => {
        dispatch(fetchProductsFavorites());
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProductList, {}, [className, cls[view]])}>
            {products.length > 0 &&
                products.map((product) => (
                    <ProductItem key={product.id} product={product} view={view} />
                ))}
            {isLoading && getSkeletons(view)}
        </div>
    );
};

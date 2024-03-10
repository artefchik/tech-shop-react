import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from 'entities/Product/ui/ProductList/ProductList.module.scss';
import { ProductItem } from 'entities/Product/ui/ProductItem/ProductItem';
import { ProductItemSkeleton } from 'entities/Product/ui/ProductItem/ProductItemSkeleton';
import { ProductFavoriteButton } from 'features/ProductFavoriteButton';
import { getUserAuthData } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProductFavoritesIsLoading } from 'features/ProductFavoriteButton/model/selectors/getProductFavoritesIsLoading/getProductFavoritesIsLoading';
import { getProductFavorites } from 'features/ProductFavoriteButton/model/slice/productFavoritesSlice';
import { getProducts } from 'pages/ProductsPage/model/slice/productsPageSlice';
import { ViewType } from 'shared/const/types';
import { useEffect } from 'react';
import { fetchProductsFavorites } from 'features/ProductFavoriteButton/model/services/fetchProductsFavorites/fetchProductsFavorites';
import { getProductsPageIsLoading } from '../../model/selectors/getProductsPageIsLoading/getProductsPageIsLoading';
import { getProductsPageView } from '../../model/selectors/getProductsPageView/getProductsPageView';

interface ArticlesInfiniteListProps {
    className?: string;
}
const getSkeletons = (view: ViewType) =>
    new Array(view === ViewType.SMALL ? 5 : 3)
        .fill(0)
        .map((item, index) => <ProductItemSkeleton key={index} />);

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
                    <ProductItem
                        key={product.id}
                        product={product}
                        view={view}
                        // AddToCartButton={
                        //     <AddToCartButton product={product} view={view} />
                        // }
                        FavoriteButton={<ProductFavoriteButton productId={product.id} />}
                    />
                ))}

            {isLoading && getSkeletons(view)}
        </div>
    );
};

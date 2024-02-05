import { useSelector } from 'react-redux';
import { ProductList } from 'entities/Product';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from 'entities/Product/ui/ProductList/ProductList.module.scss';
import { ProductItem } from 'entities/Product/ui/ProductItem/ProductItem';
import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';
import { ProductItemSkeleton } from 'entities/Product/ui/ProductItem/ProductItemSkeleton';
import { AddToCartButton } from 'features/AddToCartProduct/ui/AddToCartButton';
import {
    ProductFavoriteButton,
    useGetProductsFavorites,
} from 'features/ProductFavoriteButton';
import { getUserAuthData } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchProductsFavorites } from 'features/ProductFavoriteButton/model/services/fetchProductsFavorites/fetchProductsFavorites';
import { getProductFavoritesIsLoading } from 'features/ProductFavoriteButton/model/selectors/getProductFavoritesIsLoading/getProductFavoritesIsLoading';
import { getProductFavorites } from 'features/ProductFavoriteButton/model/slice/productFavoritesSlice';
import { useUpdateProductsFavorites } from 'features/ProductFavoriteButton/api/productFavoriteApi';
import { getProductsPageIsLoading } from '../../model/selectors/getProductsPageIsLoading/getProductsPageIsLoading';
import { getProductsPageData } from '../../model/selectors/getProductsPageData/getProductsPageData';
import { getProductsPageView } from '../../model/selectors/getProductsPageView/getProductsPageView';

interface ArticlesInfiniteListProps {
    className?: string;
}
const getSkeletons = (view: ViewType) =>
    new Array(view === ViewType.SMALL ? 6 : 3)
        .fill(0)
        .map((item, index) => <ProductItemSkeleton key={index} />);

export const ProductsPageInfiniteList = (props: ArticlesInfiniteListProps) => {
    const products = useSelector(getProductsPageData);
    const isLoading = useSelector(getProductsPageIsLoading);
    const view = useSelector(getProductsPageView);
    const { className } = props;
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const productsFavorites = useSelector(getProductFavorites.selectAll);
    const favoritesIsLoading = useSelector(getProductFavoritesIsLoading);

    useEffect(() => {
        dispatch(fetchProductsFavorites());
    }, [dispatch]);

    const [updateProductsFavorites] = useUpdateProductsFavorites();

    useEffect(() => {
        updateProductsFavorites({
            userId: authData?.id,
            favorites: productsFavorites,
        });
    }, [authData?.id, productsFavorites, updateProductsFavorites]);

    return (
        <div
            className={classNames(cls.ProductList, {}, [className, cls[view]])}
        >
            {products.length > 0 &&
                products.map((product) => {
                    const favoriteItem = productsFavorites.find(
                        (favorite) => favorite.productId === product.id,
                    );
                    // const isFavorite = productsFavorites
                    //     ? productsFavorites.find(
                    //           (favorite) => favorite.productId === product.id,
                    //       )?.isFavorite
                    //     : false;
                    return (
                        <ProductItem
                            key={product.id}
                            product={product}
                            view={view}
                            AddToCartButton={
                                <AddToCartButton
                                    product={product}
                                    view={view}
                                />
                            }
                            FavoriteButton={
                                <ProductFavoriteButton
                                    productId={product.id}
                                    isFavorite={favoriteItem?.isFavorite}
                                />
                            }
                        />
                    );
                })}

            {isLoading && getSkeletons(view)}
        </div>
    );
};

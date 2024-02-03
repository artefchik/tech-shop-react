import { useSelector } from 'react-redux';
import { ProductList } from 'entities/Product';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from 'entities/Product/ui/ProductList/ProductList.module.scss';
import { ProductItem } from 'entities/Product/ui/ProductItem/ProductItem';
import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';
import { ProductItemSkeleton } from 'entities/Product/ui/ProductItem/ProductItemSkeleton';
import { AddToCartButton } from 'features/AddToCartProduct/ui/AddToCartButton';
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

    return (
        <div
            className={classNames(cls.ProductList, {}, [className, cls[view]])}
        >
            {products.length > 0 &&
                products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        view={view}
                        AddToCartButton={
                            <AddToCartButton product={product} view={view} />
                        }
                    />
                ))}

            {isLoading && getSkeletons(view)}
        </div>
    );
};

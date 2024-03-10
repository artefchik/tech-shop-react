import { classNames } from 'shared/lib/classNames/classNames';
import { ProductItem } from 'entities/Product/ui/ProductItem/ProductItem';
import { ProductItemSkeleton } from 'entities/Product/ui/ProductItem/ProductItemSkeleton';
import { ViewType } from 'shared/const/types';
import cls from './ProductList.module.scss';
import { Product } from '../../model/product';

interface ProductListProps {
    className?: string;
    view?: ViewType;
    products: Product[];
    isLoading?: boolean;
}

const getSkeletons = (view: ViewType) =>
    new Array(view === ViewType.SMALL ? 6 : 3)
        .fill(0)
        .map((item, index) => <ProductItemSkeleton key={index} />);

export const ProductList = (props: ProductListProps) => {
    const { className, view = ViewType.BIG, products, isLoading } = props;
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

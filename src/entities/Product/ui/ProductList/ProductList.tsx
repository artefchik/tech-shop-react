import { classNames } from 'shared/lib/classNames/classNames';
import { ProductCard } from 'entities/Product/ui/ProductCard/ProductCard';
import { ProductCardSkeleton } from 'entities/Product/ui/ProductCard/ProductCardSkeleton';
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
        .map((item, index) => <ProductCardSkeleton key={index} />);

export const ProductList = (props: ProductListProps) => {
    const { className, view = ViewType.BIG, products, isLoading } = props;
    return (
        <div className={classNames(cls.ProductList, {}, [className, cls[view]])}>
            {products.length > 0 &&
                products.map((product) => (
                    <ProductCard key={product.id} product={product} view={view} />
                ))}

            {isLoading && getSkeletons(view)}
        </div>
    );
};

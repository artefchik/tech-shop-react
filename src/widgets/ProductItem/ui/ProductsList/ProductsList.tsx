import { classNames } from 'shared/lib/classNames/classNames';
import { Product, ProductCard } from 'entities/Product';
import { ViewType } from 'shared/const/types';
import { ProductCardSkeleton } from 'entities/Product/ui/ProductCard/ProductCardSkeleton';
import { ProductItem } from 'widgets/ProductItem';
import cls from './ProductsList.module.scss';

interface ProductsListProps {
    className?: string;
    view: ViewType;
    products: Product[];
    isLoading?: boolean;
}

export const ProductsList = (props: ProductsListProps) => {
    const { className, isLoading, products, view } = props;
    return (
        <div
            className={classNames(cls.ProductsList, {}, [className, cls[view]])}
        >
            {isLoading &&
                new Array(view === ViewType.SMALL ? 6 : 3)
                    .fill(0)
                    .map((item, index) => (
                        <ProductCardSkeleton view={view} key={index} />
                    ))}

            {products.length > 0 &&
                products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        view={view}
                    />
                ))}
        </div>
    );
};

import { classNames } from 'shared/lib/classNames/classNames';
import { ProductCard } from 'entities/Product/ui/ProductCard/ProductCard';
import { ViewType } from 'shared/const/types';
import cls from './ProductList.module.scss';
import { Product } from '../../model/types/product';

interface ProductListProps {
    className?: string;
    view?: ViewType;
    products: Product[];
    isLoading?: boolean;
}

export const ProductList = (props: ProductListProps) => {
    const { className, view = ViewType.BIG, products, isLoading } = props;
    return (
        <div
            className={classNames(cls.ProductList, {}, [className, cls[view]])}
        >
            {products.length > 0 &&
                products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        view={view}
                    />
                ))}
        </div>
    );
};

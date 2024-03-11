import { classNames } from 'shared/lib/classNames/classNames';
import { Product, ProductCard } from 'entities/Product';
import { ProductFavoriteButton } from 'features/ProductFavoriteButton';
import { ViewType } from 'shared/const/types';
import { AddProductButton } from 'features/CartProduct';
import cls from './ProductItem.module.scss';

interface ProductCartItemProps {
    className?: string;
    product: Product;
    view: ViewType;
}

export const ProductItem = (props: ProductCartItemProps) => {
    const { className, product, view } = props;
    return (
        <ProductCard
            key={product.id}
            product={product}
            view={view}
            AddProductButton={<AddProductButton product={product} view={view} />}
            FavoriteButton={<ProductFavoriteButton productId={product.id} />}
        />
    );
};

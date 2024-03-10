import { classNames } from 'shared/lib/classNames/classNames';
import { Product, ProductCard } from 'entities/Product';
import { AddToCartButton } from 'features/AddToCartProduct/ui/AddToCartButton';
import { ProductFavoriteButton } from 'features/ProductFavoriteButton';
import { ViewType } from 'shared/const/types';
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
            AddToCartButton={<AddToCartButton product={product} view={view} />}
            FavoriteButton={<ProductFavoriteButton productId={product.id} />}
        />
    );
};

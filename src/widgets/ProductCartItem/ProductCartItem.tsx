import { classNames } from 'shared/lib/classNames/classNames';
import { Product, ProductItem } from 'entities/Product';
import { AddToCartButton } from 'features/AddToCartProduct/ui/AddToCartButton';
import { ProductFavoriteButton } from 'features/ProductFavoriteButton';
import { ViewType } from 'shared/const/types';
import cls from './ProductCartItem.module.scss';

interface ProductCartItemProps {
    className?: string;
    product: Product;
    view: ViewType;
}

export const ProductCartItem = (props: ProductCartItemProps) => {
    const { className, product, view } = props;
    return (
        <ProductItem
            key={product.id}
            product={product}
            view={view}
            // AddToCartButton={<AddToCartButton productId={product.id} view={view} />}
            // FavoriteButton={<ProductFavoriteButton productId={product.id} />}
        />
    );
};

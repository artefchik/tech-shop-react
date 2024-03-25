import { Product, ProductCard } from 'entities/Product';
import { ProductFavoriteButton } from 'features/ProductFavoriteButton';
import { ViewType } from 'shared/const/types';
import { AddProductButton, cartProductsReducer } from 'features/CartProduct';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

interface ProductCartItemProps {
    className?: string;
    product: Product;
    view: ViewType;
}
export const ProductItem = (props: ProductCartItemProps) => {
    const { className, product, view } = props;
    return (
        <ProductCard
            className={className}
            product={product}
            view={view}
            AddProductButton={
                <AddProductButton product={product} view={view} />
            }
            FavoriteButton={<ProductFavoriteButton productId={product.id} />}
        />
    );
};

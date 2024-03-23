import {
    fetchProductById,
    getProductDetailsData,
    getProductDetailsError,
    getProductDetailsIsLoading,
    ProductDetails,
} from 'entities/Product';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { AddProductButton } from 'features/CartProduct';
import { ViewType } from 'shared/const/types';
import { ProductFavoriteButton } from 'features/ProductFavoriteButton';

interface ProductDetailsCardProps {
    className?: string;
    productId: string;
}

export const ProductDetailsCard = (props: ProductDetailsCardProps) => {
    const { className, productId } = props;
    const dispatch = useAppDispatch();
    const product = useSelector(getProductDetailsData);
    const isLoading = useSelector(getProductDetailsIsLoading);
    const error = useSelector(getProductDetailsError);

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);

    return (
        <ProductDetails
            product={product}
            className={className}
            isLoading={isLoading}
            error={Boolean(error)}
        >
            {product && (
                <>
                    <AddProductButton product={product} view={ViewType.SMALL} />
                    <ProductFavoriteButton productId={product?.id} />
                </>
            )}
        </ProductDetails>
    );
};

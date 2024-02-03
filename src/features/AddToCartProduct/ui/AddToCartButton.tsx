import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cartPlus from 'shared/assets/icons/cartPlus.svg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { cartActions } from 'entities/Cart/model/slice/cartSlice';
import { Product } from 'entities/Product';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useCallback } from 'react';
import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';
import { useUpdateProductFavorite } from 'entities/Cart/api/cartApi';
import cls from './AddToCartButton.module.scss';

interface AddToCartButtonProps {
    className?: string;
    product: Product;
    view: ViewType;
}

export const AddToCartButton = (props: AddToCartButtonProps) => {
    const { className, product, view } = props;
    const dispatch = useAppDispatch();
    // const [addToCartProduct] = useAddToCartProduct();
    const [updateProductFavorite] = useUpdateProductFavorite();
    const userData = useSelector(getUserAuthData);
    // const products = useSelector(getCartProductsData);
    const addToCart = useCallback(() => {
        dispatch(cartActions.addItem(product));
        // @ts-ignore
        // addToCartProduct(products);
    }, [dispatch, product]);
    return (
        <Button
            onClick={addToCart}
            className={classNames(cls.AddToCartButton, {}, [
                className,
                cls[view],
            ])}
        >
            <Icon Svg={cartPlus} hover={false} className={cls.cartPlus} />
            <span> Add To Cart</span>
        </Button>
    );
};

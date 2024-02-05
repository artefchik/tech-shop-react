import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cartPlus from 'shared/assets/icons/cartPlus.svg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { cartActions, getCart } from 'entities/Cart/model/slice/cartSlice';
import { Product } from 'entities/Product';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useCallback } from 'react';
import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';
import { updateCart } from 'entities/Cart';
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
    const userData = useSelector(getUserAuthData);

    const addToCart = useCallback(() => {
        dispatch(cartActions.addItem(product));
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

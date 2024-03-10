import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { removeCartProduct } from 'features/RemoveButtonCartProduct/model/services/removeCartProduct/removeCartProduct';
import { useSelector } from 'react-redux';
import { getCartData } from 'entities/Cart';
import { cartProductsActions } from 'features/CartProduct/model/slice/cartProductsSlice';
import { CartItemType } from 'entities/CartItem';
import cls from './RemoveButtonCartProduct.module.scss';

interface RemoveButtonCartProductProps {
    className?: string;
    product: CartItemType;
}

export const RemoveButtonCartProduct = memo((props: RemoveButtonCartProductProps) => {
    const { className, product } = props;
    const dispatch = useAppDispatch();
    const cart = useSelector(getCartData);
    const onRemoveItem = (id: string) => () => {
        dispatch(cartProductsActions.removeItem(id));
        dispatch(removeCartProduct({ basketId: cart?.id ?? '', productId: product.id }));
    };
    return (
        <Button
            onClick={onRemoveItem(product.id)}
            className={classNames(cls.RemoveButtonCartProduct, {}, [className])}
        />
    );
});

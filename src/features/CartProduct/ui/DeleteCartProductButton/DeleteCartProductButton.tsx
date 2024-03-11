import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { CartItemType } from 'entities/Cart';
import { deleteCartProduct } from '../../model/services/deleteCartProduct/deleteCartProduct';
import cls from './DeleteCartProductButton.module.scss';
import { cartProductsActions } from '../../model/slice/cartProductsSlice';

interface DeleteBasketProductButtonProps {
    className?: string;
    product: CartItemType;
}

export const DeleteCartProductButton = memo((props: DeleteBasketProductButtonProps) => {
    const { className, product } = props;
    const dispatch = useAppDispatch();
    const onRemoveItem = (id: string) => () => {
        dispatch(cartProductsActions.removeItem(id));
        dispatch(deleteCartProduct(product.id));
    };
    return (
        <Button
            onClick={onRemoveItem(product.id)}
            className={classNames(cls.RemoveButtonCartProduct, {}, [className])}
        />
    );
});

import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { cartActions, CartItemType } from 'entities/Cart';
import cls from './RemoveButtonCartProduct.module.scss';

interface RemoveButtonCartProductProps {
    className?: string;
    product: CartItemType;
}

export const RemoveButtonCartProduct = memo(
    (props: RemoveButtonCartProductProps) => {
        const { className, product } = props;
        const dispatch = useAppDispatch();

        const onRemoveItem = (id: string) => () => {
            dispatch(cartActions.removeItem(id));
        };
        return (
            <Button
                onClick={onRemoveItem(product.id)}
                className={classNames(cls.RemoveButtonCartProduct, {}, [
                    className,
                ])}
            />
        );
    },
);

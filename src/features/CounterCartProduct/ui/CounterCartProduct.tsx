import { Counter } from 'shared/ui/Counter/Counter';
import { cartActions } from 'entities/Cart/model/slice/cartSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getCartData } from 'entities/Cart';
import { CartItemType } from 'entities/CartItem';
import { updateCartProduct } from 'features/CartProduct/model/services/updateCartProduct/updateCartProduct';
import { cartProductsActions } from 'features/CartProduct/model/slice/cartProductsSlice';

interface CounterCartProductProps {
    className?: string;
    product: CartItemType;
}

export const CounterCartProduct = (props: CounterCartProductProps) => {
    const { className, product } = props;
    const dispatch = useAppDispatch();

    const cart = useSelector(getCartData);
    const onIncrement = (count: number) => () => {
        dispatch(cartProductsActions.addOneItem({ ...product, count: (count += 1) }));
        dispatch(
            updateCartProduct({
                productId: product.id,
                count,
                basketId: cart?.id ?? '',
            }),
        );
    };
    const onDecrement = (count: number) => () => {
        dispatch(
            cartProductsActions.removeOneItem({
                ...product,
                count: (count -= 1),
            }),
        );
        dispatch(
            updateCartProduct({
                productId: product.id,
                count,
                basketId: cart?.id ?? '',
            }),
        );
    };
    return (
        <Counter
            quantity={product.count}
            onIncrement={onIncrement(product.count)}
            onDecrement={onDecrement(product.count)}
            className={className}
        />
    );
};

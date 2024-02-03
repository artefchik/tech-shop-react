import { Counter } from 'shared/ui/Counter/Counter';
import { cartActions } from 'entities/Cart/model/slice/cartSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { CartItemType } from 'entities/Cart/model/types/cart';

interface CounterCartProductProps {
    className?: string;
    product: CartItemType;
}

export const CounterCartProduct = (props: CounterCartProductProps) => {
    const { className, product } = props;
    const dispatch = useAppDispatch();
    const onIncrement = (quantity: number) => () => {
        dispatch(
            cartActions.addOneItem({ ...product, quantity: (quantity += 1) }),
        );
    };
    const onDecrement = (quantity: number) => () => {
        dispatch(
            cartActions.removeOneItem({
                ...product,
                quantity: (quantity -= 1),
            }),
        );
    };
    return (
        <Counter
            quantity={product.quantity}
            onIncrement={onIncrement(product.quantity)}
            onDecrement={onDecrement(product.quantity)}
            className={className}
        />
    );
};

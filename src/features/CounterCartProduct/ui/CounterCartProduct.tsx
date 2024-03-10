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
    const onIncrement = (count: number) => () => {
        dispatch(cartActions.addOneItem({ ...product, count: (count += 1) }));
    };
    const onDecrement = (quantity: number) => () => {
        dispatch(
            cartActions.removeOneItem({
                ...product,
                count: (quantity -= 1),
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

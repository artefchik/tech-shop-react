import { Counter } from 'shared/ui/Counter/Counter';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { CartItemType } from 'entities/Cart';
import { cartProductsActions } from '../../model/slice/cartProductsSlice';
import { updateCartProduct } from '../../model/services/updateCartProduct/updateCartProduct';

interface CounterCartProductProps {
    className?: string;
    product: CartItemType;
}

export const CounterCartProduct = (props: CounterCartProductProps) => {
    const { className, product } = props;
    const dispatch = useAppDispatch();

    const onIncrement = (count: number) => () => {
        dispatch(cartProductsActions.addOneItem({ ...product, count: (count += 1) }));
        dispatch(
            updateCartProduct({
                productId: product.id,
                count,
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

import { CartItem } from 'entities/Cart/ui/CartItem/CartItem';
import { CartItemType } from 'entities/Cart';
import { CounterCartProduct } from '../CounterCartProduct/CounterCartProduct';
import { DeleteCartProductButton } from '../DeleteCartProductButton/DeleteCartProductButton';

interface BasketProductProps {
    className?: string;
    product: CartItemType;
}

export const CartProduct = (props: BasketProductProps) => {
    const { className, product } = props;
    return (
        <CartItem
            className={className}
            product={product}
            counter={<CounterCartProduct product={product} />}
            deleteButton={<DeleteCartProductButton product={product} />}
        />
    );
};

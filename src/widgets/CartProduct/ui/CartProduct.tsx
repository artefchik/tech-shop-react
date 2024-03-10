import { CartItem, CartItemType } from 'entities/Cart';
import { CounterCartProduct } from 'features/CounterCartProduct/ui/CounterCartProduct';
import { RemoveButtonCartProduct } from 'features/RemoveButtonCartProduct';

interface CartProductProps {
    className?: string;
    product: CartItemType;
}

export const CartProduct = (props: CartProductProps) => {
    const { className, product } = props;
    return (
        <CartItem
            className={className}
            product={product}
            counter={<CounterCartProduct product={product} />}
            removeButton={<RemoveButtonCartProduct product={product} />}
        />
    );
};

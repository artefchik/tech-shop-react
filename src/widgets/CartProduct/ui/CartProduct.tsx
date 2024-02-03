import { classNames } from 'shared/lib/classNames/classNames';
import { CartItem, CartItemType } from 'entities/Cart';
import { CounterCartProduct } from 'features/CounterCartProduct/ui/CounterCartProduct';
import { RemoveButtonCartProduct } from 'features/RemoveButtonCartProduct';

interface CartProductProps {
    className?: string;
    product: CartItemType;
    onUpdateCart: () => void;
}

export const CartProduct = (props: CartProductProps) => {
    const { className, product, onUpdateCart } = props;
    return (
        <CartItem
            product={product}
            onUpdateCart={onUpdateCart}
            counter={<CounterCartProduct product={product} />}
            removeButton={<RemoveButtonCartProduct product={product} />}
        />
    );
};

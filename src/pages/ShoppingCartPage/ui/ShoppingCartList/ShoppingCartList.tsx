import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { CartProduct, getCartAllProducts } from 'features/CartProduct';
import cls from './ShoppingCartList.module.scss';

interface ShoppingCartListProps {
    className?: string;
}

export const ShoppingCartList = ({ className }: ShoppingCartListProps) => {
    const products = useSelector(getCartAllProducts);

    return (
        <VStack gap="20" className={classNames(cls.ShoppingCartList, {}, [className])}>
            {products.length > 0 &&
                products.map((product) => (
                    <CartProduct key={product.id} product={product} />
                ))}
        </VStack>
    );
};

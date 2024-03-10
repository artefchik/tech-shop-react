import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { CartProduct } from 'features/CartProduct/ui/CartProduct/CartProduct';
import { getCartData } from 'entities/Cart/model/selectors/getCartData/getCartData';
import { useEffect } from 'react';
import { getCartProducts } from 'features/CartProduct/model/slice/cartProductsSlice';
import { fetchCartProductsList } from 'features/CartProduct/model/services/fetchCartProductsList/fetchCartProductsList';
import cls from './ShoppingCartList.module.scss';

interface ShoppingCartListProps {
    className?: string;
}

export const ShoppingCartList = ({ className }: ShoppingCartListProps) => {
    const products = useSelector(getCartProducts.selectAll);
    const dispatch = useAppDispatch();
    const cart = useSelector(getCartData);

    useEffect(() => {
        dispatch(fetchCartProductsList(cart?.id ?? ''));
    }, [cart?.id, dispatch]);

    return (
        <VStack gap="20" className={classNames(cls.ShoppingCartList, {}, [className])}>
            {!!products.length &&
                products.map((product) => (
                    <CartProduct key={product.id} product={product} />
                ))}
        </VStack>
    );
};

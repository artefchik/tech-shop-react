import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { CartProduct } from 'widgets/CartProduct/ui/CartProduct';
import { fetchCartProductsList, getCartProducts, updateCart } from 'entities/Cart';
import { getUserAuthData } from 'entities/User';
import cls from './ShoppingCartList.module.scss';

interface ShoppingCartListProps {
    className?: string;
}

export const ShoppingCartList = ({ className }: ShoppingCartListProps) => {
    const products = useSelector(getCartProducts);
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    useEffect(() => {
        dispatch(fetchCartProductsList());
    }, [dispatch]);

    return (
        <VStack gap="20" className={classNames(cls.ShoppingCartList, {}, [className])}>
            {!!products.length &&
                products.map((product) => (
                    <CartProduct key={product.id} product={product} />
                ))}
        </VStack>
    );
};

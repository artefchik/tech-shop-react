import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { getCart } from 'entities/Cart/model/slice/cartSlice';
import { useUpdateProductFavorite } from 'entities/Cart/api/cartApi';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { CartProduct } from 'widgets/CartProduct/ui/CartProduct';
import { getUserAuthData } from 'entities/User';
import { fetchCartProductsList } from 'entities/Cart';
import cls from './ShoppingCartList.module.scss';

interface ShoppingCartListProps {
    className?: string;
}

export const ShoppingCartList = ({ className }: ShoppingCartListProps) => {
    const products = useSelector(getCart.selectAll);
    const [updateProductFavorite] = useUpdateProductFavorite();
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    const onUpdateCart = () =>
        updateProductFavorite({
            products,
            userId: authData?.id || '',
        });

    useEffect(() => {
        dispatch(fetchCartProductsList());
    }, [dispatch]);

    return (
        <VStack
            gap="20"
            className={classNames(cls.ShoppingCartList, {}, [className])}
        >
            {!!products.length &&
                products.map((product) => (
                    <CartProduct
                        key={product.id}
                        product={product}
                        onUpdateCart={onUpdateCart}
                    />
                ))}
        </VStack>
    );
};

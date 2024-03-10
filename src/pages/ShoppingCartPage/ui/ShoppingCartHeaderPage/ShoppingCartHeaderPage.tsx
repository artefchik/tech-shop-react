import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { declinationOfNumber } from 'shared/lib/helpers/declinationOfNumber';
import { useTranslation } from 'react-i18next';
import { getCartData } from 'entities/Cart';
import { getCountTotalProducts } from 'features/CartProduct/model/selectors/getCountTotalProducts/getCountTotalProducts';
import { clearCartProducts } from 'features/CartProduct/model/services/clearCartProducts/clearCartProducts';
import { cartProductsActions } from 'features/CartProduct/model/slice/cartProductsSlice';
import cls from './ShoppingCartHeaderPage.module.scss';

interface ShoppingCartHeaderPageProps {
    className?: string;
}

export const ShoppingCartHeaderPage = ({ className }: ShoppingCartHeaderPageProps) => {
    const dispatch = useAppDispatch();
    const totalProducts = useSelector(getCountTotalProducts);
    const total = `${totalProducts} ${declinationOfNumber(totalProducts, ['товар', 'товара', 'товаров'])}`;
    const { t } = useTranslation();

    const cart = useSelector(getCartData);

    const onClearCart = () => {
        dispatch(cartProductsActions.clearCart());
        dispatch(clearCartProducts(cart?.id ?? ''));
    };

    return (
        <HStack
            align="center"
            gap="10"
            justify="between"
            className={classNames(cls.ShoppingCartHeaderPage, {}, [className])}
        >
            <HStack align="center" gap="10">
                <Text text="Корзина" />
                <Text text={total} />
            </HStack>
            <Button onClick={onClearCart}>{t('Очистить корзину')}</Button>
        </HStack>
    );
};

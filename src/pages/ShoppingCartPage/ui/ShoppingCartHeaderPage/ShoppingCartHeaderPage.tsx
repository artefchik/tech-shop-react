import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { declinationOfNumber } from 'shared/lib/helpers/declinationOfNumber';
import { useTranslation } from 'react-i18next';
import {
    cartProductsActions,
    clearCartProducts,
    getCartProductsTotal,
} from 'features/CartProduct';
import cls from './ShoppingCartHeaderPage.module.scss';

interface ShoppingCartHeaderPageProps {
    className?: string;
}

export const ShoppingCartHeaderPage = ({ className }: ShoppingCartHeaderPageProps) => {
    const dispatch = useAppDispatch();
    const totalProducts = useSelector(getCartProductsTotal);
    const { t } = useTranslation();
    const total = `${totalProducts} ${declinationOfNumber(totalProducts, [t('товар'), t('товара'), t('товаров')])}`;

    const onClearCart = () => {
        dispatch(cartProductsActions.clearCart());
        dispatch(clearCartProducts());
    };

    return (
        <HStack
            align="center"
            gap="10"
            justify="between"
            className={classNames(cls.ShoppingCartHeaderPage, {}, [className])}
        >
            <HStack align="center" gap="10">
                <Text text={t('Корзина')} />
                <Text text={total} />
            </HStack>
            <Button onClick={onClearCart}>{t('Очистить корзину')}</Button>
        </HStack>
    );
};

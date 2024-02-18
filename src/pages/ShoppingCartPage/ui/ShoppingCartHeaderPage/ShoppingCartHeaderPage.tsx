import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { cartActions, getCountTotalProducts } from 'entities/Cart';
import { declinationOfNumber } from 'shared/lib/helpers/declinationOfNumber';
import cls from './ShoppingCartHeaderPage.module.scss';

interface ShoppingCartHeaderPageProps {
    className?: string;
}

export const ShoppingCartHeaderPage = ({ className }: ShoppingCartHeaderPageProps) => {
    const dispatch = useAppDispatch();
    const totalProducts = useSelector(getCountTotalProducts);
    const total = `${totalProducts} ${declinationOfNumber(totalProducts, ['товар', 'товара', 'товаров'])}`;
    const onClearCart = () => {
        dispatch(cartActions.clearCart());
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
            <Button onClick={onClearCart}>Очистить корзину</Button>
        </HStack>
    );
};

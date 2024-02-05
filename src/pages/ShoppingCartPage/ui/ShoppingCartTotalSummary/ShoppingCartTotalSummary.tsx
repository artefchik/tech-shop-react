import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { getCartTotalPrice } from 'entities/Cart';
import { Button } from 'shared/ui/Button/Button';
import cls from './ShoppingCartTotalSummary.module.scss';

interface ShoppingCartTotalSummaryProps {
    className?: string;
}

export const ShoppingCartTotalSummary = ({
    className,
}: ShoppingCartTotalSummaryProps) => {
    const totalPrice = useSelector(getCartTotalPrice);
    return (
        <div
            className={classNames(cls.ShoppingCartTotalSummary, {}, [
                className,
            ])}
        >
            <HStack justify="end" align="center" gap="20">
                <Text title="Итого" theme={TextTheme.HEADER} />
                <Text text={String(totalPrice)} theme={TextTheme.HEADER} />
            </HStack>
        </div>
    );
};

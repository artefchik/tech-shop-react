import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getCartTotalPrice } from 'features/CartProduct/model/selectors/getCartTotalPrice/getCartTotalPrice';
import cls from './ShoppingCartTotalSummary.module.scss';

interface ShoppingCartTotalSummaryProps {
    className?: string;
}

export const ShoppingCartTotalSummary = ({
    className,
}: ShoppingCartTotalSummaryProps) => {
    const totalPrice = useSelector(getCartTotalPrice);
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.ShoppingCartTotalSummary, {}, [className])}>
            <HStack justify="end" align="center" gap="20">
                <Text text={t('Итого')} />
                <Text text={String(totalPrice)} />
            </HStack>
        </div>
    );
};

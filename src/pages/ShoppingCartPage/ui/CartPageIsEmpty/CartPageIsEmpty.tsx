import { classNames } from 'shared/lib/classNames/classNames';
import emptyImage from 'shared/assets/icons/empty-cart.svg';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextWeight } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Icon } from 'shared/ui/Icon/Icon';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { getRoutePathProducts } from 'shared/const/router';
import cls from './CartPageIsEmpty.module.scss';

interface CartPageIsEmptyProps {
    className?: string;
}

export const CartPageIsEmpty = (props: CartPageIsEmptyProps) => {
    const { className } = props;
    const { t } = useTranslation();
    return (
        <VStack
            align="center"
            gap="20"
            className={classNames(cls.CartPageIsEmpty, {}, [className])}
        >
            <Icon Svg={emptyImage} className={cls.icon} hover={false} />
            <Text
                size={TextSize.BIG}
                text={t('Your cart is empty')}
                weight={TextWeight.SEMI}
            />
            <AppLink to={getRoutePathProducts()}>{t('Go to products')}</AppLink>
        </VStack>
    );
};

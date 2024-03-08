import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import cart from 'shared/assets/icons/cart.svg';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { getRoutePathShoppingCart } from 'shared/const/router';
import { getCountTotalProducts } from 'entities/Cart';
import cls from './CartButton.module.scss';

interface CartButtonProps {
    className?: string;
}

export const CartButton = (props: CartButtonProps) => {
    const { className } = props;
    const authData = useSelector(getUserAuthData);
    const totalProducts = useSelector(getCountTotalProducts);
    return (
        <AppLink
            to={getRoutePathShoppingCart()}
            theme={AppLinkTheme.CLEAR}
            className={classNames(cls.CartButton, {}, [className])}
        >
            <Icon Svg={cart} />
            {!!totalProducts && <span>{totalProducts}</span>}
        </AppLink>
    );
};

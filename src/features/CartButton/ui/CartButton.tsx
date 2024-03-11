import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import cart from 'shared/assets/icons/cart.svg';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { getRoutePathShoppingCart } from 'shared/const/router';
import { getCartProductsTotal } from 'features/CartProduct/model/selectors/getCartProductsTotal/getCartProductsTotal';
import cls from './CartButton.module.scss';

interface CartButtonProps {
    className?: string;
}

export const CartButton = (props: CartButtonProps) => {
    const { className } = props;
    const totalProducts = useSelector(getCartProductsTotal);
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

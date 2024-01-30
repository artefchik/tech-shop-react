import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import cart from 'shared/assets/icons/cart.svg';
import cls from './CartButton.module.scss';

interface CartButtonProps {
    className?: string;
}

export const CartButton = (props: CartButtonProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.CartButton, {}, [className])}>
            <Icon Svg={cart} className={cls.icon} hover={false} />
        </div>
    );
};

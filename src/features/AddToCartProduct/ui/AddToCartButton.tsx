import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cartPlus from 'shared/assets/icons/cartPlus.svg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { cartActions } from 'entities/Cart/model/slice/cartSlice';
import { Product } from 'entities/Product';
import cls from './AddToCartButton.module.scss';

interface AddToCartButtonProps {
    className?: string;
    product: Product;
}

export const AddToCartButton = (props: AddToCartButtonProps) => {
    const { className, product } = props;
    const dispatch = useAppDispatch();
    const addToCart = () => {
        dispatch(cartActions.addOneItem(product));
    };
    return (
        <Button
            onClick={addToCart}
            className={classNames(cls.AddToCartButton, {}, [className])}
        >
            <Icon Svg={cartPlus} hover={false} className={cls.cartPlus} />
            <span> Add To Cart</span>
        </Button>
    );
};

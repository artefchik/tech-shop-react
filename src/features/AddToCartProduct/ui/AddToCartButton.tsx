import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cartPlus from 'shared/assets/icons/cartPlus.svg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { cartActions, getCart } from 'entities/Cart/model/slice/cartSlice';
import { Product } from 'entities/Product';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useCallback } from 'react';
import { ViewType } from 'shared/const/types';
import { useTranslation } from 'react-i18next';
import cls from './AddToCartButton.module.scss';

interface AddToCartButtonProps {
    className?: string;
    productId: string;
    view: ViewType;
}

export const AddToCartButton = (props: AddToCartButtonProps) => {
    const { className, productId, view } = props;
    const dispatch = useAppDispatch();
    // const [addToCartProduct] = useAddToCartProduct();
    const userData = useSelector(getUserAuthData);
    const { t } = useTranslation();
    // const addToCart = useCallback(() => {
    //     dispatch(cartActions.addOneItem(product));
    // }, [dispatch, product]);
    //

    return (
        <Button
            // onClick={addToCart}
            className={classNames(cls.AddToCartButton, {}, [className, cls[view]])}
        >
            <Icon Svg={cartPlus} hover={false} className={cls.cartPlus} />
            <span>{t('Add To Cart')}</span>
        </Button>
    );
};

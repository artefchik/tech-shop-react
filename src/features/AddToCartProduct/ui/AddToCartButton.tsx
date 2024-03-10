import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cartPlus from 'shared/assets/icons/cartPlus.svg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { ViewType } from 'shared/const/types';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { Product } from 'entities/Product';
import { getCartData } from 'entities/Cart';
import { addToProduct } from 'features/CartProduct/model/services/addToProduct/addToProduct';
import { cartProductsActions } from 'features/CartProduct/model/slice/cartProductsSlice';
import cls from './AddToCartButton.module.scss';

interface AddToCartButtonProps {
    className?: string;
    product: Product;
    view: ViewType;
}

export const AddToCartButton = (props: AddToCartButtonProps) => {
    const { className, product, view } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const basket = useSelector(getCartData);
    const addToCart = useCallback(() => {
        dispatch(cartProductsActions.addItem(product));
        dispatch(addToProduct({ basketId: basket?.id ?? '', productId: product.id }));
    }, [basket?.id, dispatch, product]);

    return (
        <Button
            onClick={addToCart}
            className={classNames(cls.AddToCartButton, {}, [className, cls[view]])}
        >
            <Icon Svg={cartPlus} hover={false} className={cls.cartPlus} />
            <span>{t('Add To Cart')}</span>
        </Button>
    );
};

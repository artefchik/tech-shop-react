import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cartPlus from 'shared/assets/icons/cartPlus.svg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ViewType } from 'shared/const/types';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { Product } from 'entities/Product';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    cartProductsActions,
    cartProductsReducer,
} from '../../model/slice/cartProductsSlice';
import { addToProduct } from '../../model/services/addToProduct/addToProduct';
import cls from './AddProductButton.module.scss';

interface AddProductButtonProps {
    className?: string;
    product: Product;
    view: ViewType;
}

const reducers: ReducersList = {
    cartProducts: cartProductsReducer,
};

export const AddProductButton = (props: AddProductButtonProps) => {
    const { className, product, view } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const addToCart = useCallback(() => {
        dispatch(cartProductsActions.addItem(product));
        dispatch(addToProduct(product.id));
    }, [dispatch, product]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Button
                onClick={addToCart}
                className={classNames(cls.AddProductButton, {}, [className, cls[view]])}
            >
                <>
                    <Icon Svg={cartPlus} hover={false} className={cls.cartPlus} />
                    <span>{t('Add To Cart')}</span>
                </>
            </Button>
        </DynamicModuleLoader>
    );
};

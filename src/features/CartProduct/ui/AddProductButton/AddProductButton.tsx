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
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import { Modal } from 'shared/ui/Modal/Modal';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { getRoutePathAuth } from 'shared/const/router';
import { VStack } from 'shared/ui/Stack';
import { StateSchema } from 'app/providers/StoreProvider';
import { ViewCounter } from 'shared/ui/Counter/Counter';
import { CounterCartProduct } from '../CounterCartProduct/CounterCartProduct';
import {
    cartProductsActions,
    cartProductsReducer,
    getCartProducts,
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
    const { isOpenModal, onShowModal, onCloseModal } = useToggleModal();
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const cartProduct = useSelector((state: StateSchema) =>
        getCartProducts.selectById(state, product.id),
    );
    const addToCart = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (!userData?.id) {
                onShowModal();
            } else {
                dispatch(cartProductsActions.addItem(product));
                dispatch(addToProduct(product.id));
            }
        },
        [dispatch, onShowModal, product, userData?.id],
    );

    if (cartProduct) {
        return (
            <CounterCartProduct product={cartProduct} view={ViewCounter.BIG} />
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Modal isOpen={isOpenModal} lazy onClose={onCloseModal}>
                <VStack align="center" gap="5">
                    <Text
                        text={t(
                            'Only authorized users can add products to the shopping cart',
                        )}
                        align={TextAlign.CENTER}
                    />
                    <AppLink
                        theme={AppLinkTheme.SECONDARY}
                        to={getRoutePathAuth()}
                    >
                        {t('Sign Up')}
                    </AppLink>
                </VStack>
            </Modal>

            <Button
                onClick={addToCart}
                className={classNames(cls.AddProductButton, {}, [
                    className,
                    cls[view],
                ])}
            >
                <>
                    <Icon
                        Svg={cartPlus}
                        hover={false}
                        className={cls.cartPlus}
                    />
                    <span>{t('Add To Cart')}</span>
                </>
            </Button>
        </DynamicModuleLoader>
    );
};

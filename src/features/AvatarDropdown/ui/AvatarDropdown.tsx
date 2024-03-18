import {
    Dropdown,
    DropdownItem,
} from 'shared/ui/DropdownsList/ui/Dropdown/Dropdown';
import { getRoutePathProfile } from 'shared/const/router';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import user from 'shared/assets/icons/user.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import { Icon } from 'shared/ui/Icon/Icon';
import { AuthModal } from 'widgets/AuthModal/ui/AuthModal';
import { logout } from 'entities/User/model/services/logout/logout';
import { favoriteActions } from 'entities/Favorite/model/slice/favoriteSlice';
import { cartActions } from 'entities/Cart/model/slice/cartSlice';
import { cartProductsActions } from 'features/CartProduct';
import { productFavoritesActions } from 'features/ProductFavoriteButton/model/slice/productFavoritesSlice';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
    const { className } = props;
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const { isOpenModal, onCloseModal, onShowModal } = useToggleModal();

    const onLogout = useCallback(() => {
        dispatch(logout());
        dispatch(favoriteActions.setLogout());
        dispatch(cartActions.setLogout());
        dispatch(cartProductsActions.clearCart());
        dispatch(productFavoritesActions.clearFavorites());
    }, [dispatch]);

    const profileActions: DropdownItem[] = [
        {
            content: 'Профиль',
            href: authData ? getRoutePathProfile(authData.id) : '',
        },
        {
            content: 'Выйти',
            onClick: onLogout,
        },
    ];

    if (!authData) {
        return (
            <>
                <Button theme={ThemeButton.CLEAR} onClick={onShowModal}>
                    <Icon Svg={user} />
                </Button>
                {isOpenModal && (
                    // <LoginModal isOpen={isOpenModal} onClose={onCloseModal} />
                    <AuthModal isOpen={isOpenModal} onClose={onCloseModal} />
                )}
            </>
        );
    }

    return (
        <Dropdown
            items={profileActions}
            icon={user}
            open="bottomLeft"
            triggerClear
            className={className}
        />
    );
};

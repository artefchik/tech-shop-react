import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useMemo } from 'react';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { Dropdown, DropdownItem } from 'shared/ui/DropdownsList/ui/Dropdown/Dropdown';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { NotificationButton } from 'features/NotificationButton';
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import user from 'shared/assets/icons/user.svg';
import { RoutePath } from 'shared/const/router';
import { AvatarDropdown } from 'features/AvatarDropdown/ui/AvatarDropdown';
import { Button } from 'shared/ui/Button/Button';
import { CartButton } from 'features/CartButton';
import { HStack } from 'shared/ui/Stack';
import { MenuBurgerButton } from 'features/MenuBurgerButton/ui/MenuBurgerButton/MenuBurgerButton';
import cls from './ActionsNavbar.module.scss';

interface ActionsNavbarProps {
    className?: string;
    isOpenMenu?: boolean;
    onToggleMenu?: () => void;
}

export const ActionsNavbar = memo((props: ActionsNavbarProps) => {
    const { className, onToggleMenu, isOpenMenu } = props;
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const { isOpenModal, onCloseModal, onShowModal } = useToggleModal();

    const onLogout = useCallback(() => {
        dispatch(userActions.setLogout());
    }, [dispatch]);

    const mods: Mods = useMemo(
        () => ({
            [cls.active]: isOpenMenu,
        }),
        [isOpenMenu],
    );

    const profileActions: DropdownItem[] = [
        ...(authData
            ? [
                  {
                      content: 'Профиль',
                      href: RoutePath.profile + authData._id,
                  },
                  {
                      content: 'Выйти',
                      onClick: onLogout,
                  },
              ]
            : [{ content: 'Войти', onClick: onShowModal }]),
    ];

    return (
        <nav className={classNames(cls.ActionsNavbar, {}, [className])}>
            <HStack gap="20" align="center">
                <NotificationButton />
                <CartButton />
                <AvatarDropdown />
                <ThemeSwitcher />
                <MenuBurgerButton />
            </HStack>
        </nav>
    );
});

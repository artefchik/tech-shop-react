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
import { RoutePath } from 'shared/const/router';
import { AvatarDropdown } from 'features/AvatarDropdown/ui/AvatarDropdown';
import { CartButton } from 'features/CartButton';
import { HStack } from 'shared/ui/Stack';
import cls from './ActionsNavbar.module.scss';

interface ActionsNavbarProps {
    className?: string;
}

export const ActionsNavbar = memo((props: ActionsNavbarProps) => {
    const { className } = props;
    return (
        <nav className={classNames(cls.ActionsNavbar, {}, [className])}>
            <HStack gap="20" align="center">
                <NotificationButton />
                <CartButton />
                <AvatarDropdown />
                <ThemeSwitcher />
            </HStack>
        </nav>
    );
});

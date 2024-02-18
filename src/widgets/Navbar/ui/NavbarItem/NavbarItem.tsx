import { classNames } from 'shared/lib/classNames/classNames';
import { AppNavLink } from 'shared/ui/AppNavLink/AppNavLink';
import { isMobile } from 'react-device-detect';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { menuBurgerActions } from 'features/MenuBurgerButton';
import cls from './NavbarItem.module.scss';
import { NavbarItemType } from '../../model/items';

interface NavbarItemProps {
    className?: string;
    item: NavbarItemType;
}

export const NavbarItem = (props: NavbarItemProps) => {
    const { className, item } = props;
    const dispatch = useAppDispatch();
    const onCloseMenu = useCallback(() => {
        if (isMobile) {
            dispatch(menuBurgerActions.setOpenMenu(false));
        }
    }, [dispatch]);

    return (
        <AppNavLink
            onClick={onCloseMenu}
            to={item.path}
            className={classNames(cls.NavbarItem, {}, [className])}
        >
            {item.text}
        </AppNavLink>
    );
};

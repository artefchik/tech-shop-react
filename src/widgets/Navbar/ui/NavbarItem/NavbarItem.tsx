import { classNames } from 'shared/lib/classNames/classNames';
import { AppNavLink } from 'shared/ui/AppNavLink/AppNavLink';
import cls from './NavbarItem.module.scss';
import { NavbarItemType } from '../../model/items';

interface NavbarItemProps {
    className?: string;
    item: NavbarItemType;
}

export const NavbarItem = (props: NavbarItemProps) => {
    const { className, item } = props;
    return (
        <AppNavLink
            to={item.path}
            activeClassname={cls.active}
            className={classNames(cls.NavbarItem, {}, [className])}
        >
            {item.text}
        </AppNavLink>
    );
};

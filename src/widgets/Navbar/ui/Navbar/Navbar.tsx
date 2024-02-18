import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { NavbarItem } from 'widgets/Navbar/ui/NavbarItem/NavbarItem';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getIsOpenMenuBurger } from 'features/MenuBurgerButton';
import cls from './Navbar.module.scss';
import { NavbarItemsList } from '../../model/items';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const isOpenMenuBurger = useSelector(getIsOpenMenuBurger);

    const mods: Mods = {
        [cls.open]: isOpenMenuBurger,
    };
    return (
        <nav className={classNames(cls.Navbar, mods, [className])}>
            <ul className={cls.list}>
                {NavbarItemsList.map((item) => (
                    <li key={item.path} className={cls.item}>
                        <NavbarItem item={item} className={cls.link} />
                    </li>
                ))}
            </ul>
        </nav>
    );
});

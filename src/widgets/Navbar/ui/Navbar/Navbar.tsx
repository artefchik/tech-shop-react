import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { NavbarItem } from 'widgets/Navbar/ui/NavbarItem/NavbarItem';
import { memo, useMemo } from 'react';
import { useMenuInitiated } from 'app/providers/MenuInitiatedProvider';
import cls from './Navbar.module.scss';
import { NavbarItemsList } from '../../model/items';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;

    const { isMenuInitiated, menuToggle } = useMenuInitiated();

    const mods: Mods = {
        [cls.open]: isMenuInitiated,
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

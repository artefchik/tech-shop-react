import { NavbarItem } from 'widgets/Navbar/ui/NavbarItem/NavbarItem';
import { memo } from 'react';
import { HStack } from 'shared/ui/Stack';
import {
    getRoutePathAbout,
    getRoutePathArticles,
    getRoutePathMain,
    getRoutePathProducts,
} from 'shared/const/router';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { navbarItemsList } from '../../model/items';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <nav className={className}>
            <HStack As="ul" align="center" gap="35">
                {navbarItemsList.map((item) => (
                    <li key={item.path}>
                        <NavbarItem item={item} />
                    </li>
                ))}
            </HStack>
        </nav>
    );
});

import { NavbarItem } from 'widgets/Navbar/ui/NavbarItem/NavbarItem';
import { memo, useMemo } from 'react';
import { HStack } from 'shared/ui/Stack';
import {
    getRoutePathAbout,
    getRoutePathArticles,
    getRoutePathMain,
    getRoutePathProducts,
} from 'shared/const/router';
import { useTranslation } from 'react-i18next';
import { NavbarItemType } from 'widgets/Navbar/model/items';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const navbarItemsList = useMemo<NavbarItemType[]>(
        () => [
            {
                path: getRoutePathMain(),
                text: t('Home'),
            },
            {
                path: getRoutePathAbout(),
                text: t('About Us'),
            },
            {
                path: getRoutePathArticles(),
                text: t('Articles'),
            },
            {
                path: getRoutePathProducts(),
                text: t('Products'),
            },
        ],
        [t],
    );
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

import { NavbarItem } from 'widgets/Navbar/ui/NavbarItem/NavbarItem';
import { memo } from 'react';
import { HStack } from 'shared/ui/Stack';
import {
    getRoutePathAbout,
    getRoutePathArticles,
    getRoutePathMain,
    getRoutePathProducts,
} from 'shared/const/router';
import i18n from 'shared/config/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { NavbarItemType } from 'widgets/Navbar/model/items';
// import { navbarItemsList, NavbarItemType } from '../../model/items';

interface NavbarProps {
    className?: string;
}

export const navbarItemsList: NavbarItemType[] = [
    {
        path: getRoutePathMain(),
        text: i18n.t('Home'),
    },
    {
        path: getRoutePathAbout(),
        text: i18n.t('About Us'),
    },
    {
        path: getRoutePathArticles(),
        text: i18n.t('Articles'),
    },
    {
        path: getRoutePathProducts(),
        text: i18n.t('Products'),
    },
];

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

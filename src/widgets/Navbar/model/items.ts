import {
    getRoutePathAbout,
    getRoutePathArticles,
    getRoutePathMain,
    getRoutePathProducts,
} from 'shared/const/router';
// import i18n from 'i18next';
import i18n from 'shared/config/i18n/i18n';

export interface NavbarItemType {
    path: string;
    text: string;
}

export interface ActionNavbarItemType {
    path: string;
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

import React from 'react';
import {
    getRoutePathAbout,
    getRoutePathArticles,
    getRoutePathMain,
    getRoutePathProducts,
    getRoutePathShoppingCart,
} from 'shared/const/router';
import home from 'shared/assets/icons/home.svg';
import articles from 'shared/assets/icons/article.svg';
import cart from 'shared/assets/icons/cart.svg';
import about from 'shared/assets/icons/about.svg';
import i18n from 'i18next';
import 'shared/config/i18n/i18n';

export interface MobileNavbarItemType {
    path: string;
    text: string;
    icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const mobileNavbarItemsList: MobileNavbarItemType[] = [
    {
        path: getRoutePathMain(),
        text: i18n.t('Home'),
        icon: home,
    },
    {
        path: getRoutePathAbout(),
        text: i18n.t('About'),
        icon: about,
    },
    {
        path: getRoutePathArticles(),
        text: i18n.t('Articles'),
        icon: articles,
    },
    {
        path: getRoutePathProducts(),
        text: i18n.t('Products'),
        icon: home,
    },
    {
        path: getRoutePathShoppingCart(),
        text: i18n.t('Shopping Cart'),
        icon: cart,
    },
];

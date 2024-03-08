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

export interface MobileNavbarItemType {
    path: string;
    text: string;
    icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const mobileNavbarItemsList: MobileNavbarItemType[] = [
    {
        path: getRoutePathMain(),
        text: 'Home',
        icon: home,
    },
    {
        path: getRoutePathAbout(),
        text: 'About',
        icon: home,
    },
    {
        path: getRoutePathArticles(),
        text: 'Articles',
        icon: articles,
    },
    {
        path: getRoutePathProducts(),
        text: 'Products',
        icon: home,
    },
    {
        path: getRoutePathShoppingCart(),
        text: 'Shopping Cart',
        icon: cart,
    },
];

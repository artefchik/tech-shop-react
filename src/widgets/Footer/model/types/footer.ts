import {
    getRoutePathAbout,
    getRoutePathArticles,
    getRoutePathMain,
    getRoutePathProducts,
    getRoutePathProductsCategories,
} from 'shared/const/router';
import { ProductsCategories } from 'shared/const/types';

export interface FooterLinkType {
    title: string;
    path: string;
}

export const footerLinksList: FooterLinkType[] = [
    {
        title: 'Home',
        path: getRoutePathMain(),
    },
    {
        title: 'About',
        path: getRoutePathAbout(),
    },
    {
        title: 'Articles',
        path: getRoutePathArticles(),
    },
    {
        title: 'Products',
        path: getRoutePathProducts(),
    },
];

export const footerCategoryLinksList: FooterLinkType[] = [
    {
        title: 'All',
        path: getRoutePathProductsCategories(ProductsCategories.ALL),
    },
    {
        title: 'Phone',
        path: getRoutePathProductsCategories(ProductsCategories.PHONE),
    },
    {
        title: 'PC',
        path: getRoutePathProductsCategories(ProductsCategories.PC),
    },
    {
        title: 'Accessories',
        path: getRoutePathProductsCategories(ProductsCategories.ACCESSORIES),
    },
];

export const footerBottomLinksList: FooterLinkType[] = [
    {
        title: 'Terms of Use',
        path: '#',
    },
    {
        title: 'Privacy Policy',
        path: '#',
    },
];

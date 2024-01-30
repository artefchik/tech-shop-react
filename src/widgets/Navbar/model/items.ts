import {
    getRoutePathAbout,
    getRoutePathArticles,
    getRoutePathMain,
    getRoutePathProducts,
} from 'shared/const/router';

export interface NavbarItemType {
    path: string;
    text: string;
}

export const NavbarItemsList: NavbarItemType[] = [
    {
        path: getRoutePathMain(),
        text: 'Home',
    },
    {
        path: getRoutePathAbout(),
        text: 'About',
    },
    {
        path: getRoutePathArticles(),
        text: 'Articles',
    },
    {
        path: getRoutePathProducts(),
        text: 'Products',
    },
];

export interface ActionNavbarItemType {
    path: string;
}

import { RoutePath } from 'shared/const/router';

export interface NavbarItemType {
    path:string;
    text:string
}

export const NavbarItemsList:NavbarItemType[] = [
    {
        path: RoutePath.main,
        text: 'Home',
    },
    {
        path: RoutePath.about,
        text: 'About',
    },
    {
        path: RoutePath.articles,
        text: 'Articles',
    },

];

export interface ActionNavbarItemType {
    path:string;
}

export const ActionItemsList:ActionNavbarItemType[] = [
    {
        path: RoutePath.profile,
    },
];

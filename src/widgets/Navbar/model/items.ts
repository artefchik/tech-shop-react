import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ReactNode } from 'react';
import { FaUser } from 'react-icons/fa';
import { IconType } from 'react-icons';

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
    Icon:IconType
}

export const ActionItemsList:ActionNavbarItemType[] = [
    {
        path: RoutePath.profile,
        Icon: FaUser,
    },
];

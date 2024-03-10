import {
    getRoutePathAbout,
    getRoutePathArticles,
    getRoutePathMain,
    getRoutePathProducts,
} from 'shared/const/router';
import i18n from 'i18next';
import 'shared/config/i18n/i18n';

export interface NavbarItemType {
    path: string;
    text: string;
}

export interface ActionNavbarItemType {
    path: string;
}

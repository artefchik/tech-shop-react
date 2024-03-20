import { getRoutePathArticlesCreate } from 'shared/const/router';

export enum ProfilePageItemType {
    SETTING = 'settings',
    PROFILE = 'profile',
    FAVORITES = 'favorites',
    CREATE_ARTICLE = 'create_article',
}

export interface ProfileItem {
    content: string;
    block: ProfilePageItemType;
    to?: string;
}

export const profileItemsConfig: ProfileItem[] = [
    {
        content: 'Profile',
        block: ProfilePageItemType.PROFILE,
    },
    {
        content: 'Settings',
        block: ProfilePageItemType.SETTING,
    },
    {
        content: 'Favorites',
        block: ProfilePageItemType.FAVORITES,
    },
    {
        content: 'Creating an article',
        block: ProfilePageItemType.CREATE_ARTICLE,
        to: getRoutePathArticlesCreate(),
    },
];

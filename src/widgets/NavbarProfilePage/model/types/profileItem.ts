import { getRoutePathArticlesCreate } from 'shared/const/router';

export enum ProfilePageItemType {
    SETTING = 'settings',
    PROFILE = 'profile',
    FAVORITES = 'favorites',
    CREATE_ARTICLE = 'create_article',
    USER_ARTICLES = 'user_articles',
    OFFERED_ARTICLES = 'offered_articles',
}

export interface ProfileItem {
    content: string;
    block: ProfilePageItemType;
    to?: string;
}

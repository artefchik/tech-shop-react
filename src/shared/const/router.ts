import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    PRODUCTS = 'products',
    CART_PRODUCTS = 'cart_products',

    NOT_FOUND = 'not_found',
}

export const getRoutePathMain = () => '/';
export const getRoutePathAbout = () => '/about';
export const getRoutePathProfile = (id: string) => `/profile/${id}`;
export const getRoutePathArticles = () => '/articles';
export const getRoutePathArticlesDetailsById = (id: string) =>
    `/articles/${id}`;
export const getRoutePathArticlesCreate = () => '/articles/new';
export const getRoutePathArticlesEditById = (id: string) =>
    `/articles/${id}/edit`;

export const getRoutePathProducts = () => '/products';
export const getRoutePathCartProducts = () => '/cart_products';

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: getRoutePathMain(),
    [AppRoutes.ABOUT]: getRoutePathAbout(),
    [AppRoutes.PROFILE]: getRoutePathProfile(':id'),
    [AppRoutes.ARTICLES]: getRoutePathArticles(),
    [AppRoutes.ARTICLE_DETAILS]: getRoutePathArticlesDetailsById(':id'), // + :id
    [AppRoutes.ARTICLE_CREATE]: getRoutePathArticlesCreate(),
    [AppRoutes.ARTICLE_EDIT]: getRoutePathArticlesEditById(':id'), // + :id
    [AppRoutes.PRODUCTS]: getRoutePathProducts(),
    [AppRoutes.CART_PRODUCTS]: getRoutePathCartProducts(),

    [AppRoutes.NOT_FOUND]: '*',
};

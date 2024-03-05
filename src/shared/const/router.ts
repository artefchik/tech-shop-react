import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    PRODUCTS = 'products',
    PRODUCTS_CATEGORIES = 'products_categories',
    SHOPPING_CART = 'shopping_cart',

    NOT_FOUND = 'not_found',
}

export const getRoutePathMain = () => '/';
export const getRoutePathAbout = () => '/about';
export const getRoutePathProfile = (id: string) => `/profile/${id}`;
export const getRoutePathArticles = () => '/articles';
export const getRoutePathArticlesDetailsById = (id: string) => `/articles/${id}`;
export const getRoutePathArticlesCreate = () => '/articles/new';
export const getRoutePathArticlesEditById = (id: string) => `/articles/${id}/edit`;

export const getRoutePathProducts = () => '/products';
export const getRoutePathProductsCategories = (category: string) =>
    `/products/${category}`;
export const getRoutePathShoppingCart = () => '/shopping_cart';

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: getRoutePathMain(),
    [AppRoutes.ABOUT]: getRoutePathAbout(),
    [AppRoutes.PROFILE]: getRoutePathProfile(':id'),
    [AppRoutes.ARTICLES]: getRoutePathArticles(),
    [AppRoutes.ARTICLE_DETAILS]: getRoutePathArticlesDetailsById(':id'), // + :id
    [AppRoutes.ARTICLE_CREATE]: getRoutePathArticlesCreate(),
    [AppRoutes.ARTICLE_EDIT]: getRoutePathArticlesEditById(':id'), // + :id
    [AppRoutes.PRODUCTS]: getRoutePathProducts(),
    [AppRoutes.PRODUCTS_CATEGORIES]: getRoutePathProductsCategories(':category'), // + :id
    [AppRoutes.SHOPPING_CART]: getRoutePathShoppingCart(),

    [AppRoutes.NOT_FOUND]: '*',
};

import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
}

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',

  NOT_FOUND = 'not_found',
}

export const getRoutePathMain = () => '/';
export const getRoutePathAbout = () => '/about';
export const getRoutePathProfile = (id:string) => `/profile/${id}`;
export const getRoutePathArticles = () => '/articles';
export const getRoutePathArticlesDetailsById = (id:string) => `/articles/${id}`;
export const getRoutePathArticlesCreate = () => '/articles/new';
export const getRoutePathArticlesEditById = (id:string) => `/articles/${id}/edit`;
export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: getRoutePathMain(),
    [AppRoutes.ABOUT]: getRoutePathAbout(),
    [AppRoutes.PROFILE]: getRoutePathProfile(':id'),
    [AppRoutes.ARTICLES]: getRoutePathArticles(),
    [AppRoutes.ARTICLE_DETAILS]: getRoutePathArticlesDetailsById(':id'), // + :id
    [AppRoutes.ARTICLE_CREATE]: getRoutePathArticlesCreate(),
    [AppRoutes.ARTICLE_EDIT]: getRoutePathArticlesEditById(':id'), // + :id

    [AppRoutes.NOT_FOUND]: '*',
};

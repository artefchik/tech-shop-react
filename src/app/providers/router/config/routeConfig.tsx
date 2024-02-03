import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { ProfilePage } from 'pages/ProfilePage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticleDetailsEditPage } from 'pages/ArticleDetailsEditPage';
import { NotFoundPage } from 'pages/NotFoundPage/ui/NotFoundPage';
import {
    AppRoutes,
    AppRoutesProps,
    getRoutePathAbout,
    getRoutePathArticles,
    getRoutePathArticlesCreate,
    getRoutePathArticlesDetailsById,
    getRoutePathArticlesEditById,
    getRoutePathMain,
    getRoutePathProducts,
    getRoutePathProfile,
    getRoutePathShoppingCart,
    RoutePath,
} from 'shared/const/router';
import { ProductsPage } from 'pages/ProductsPage';
import { ShoppingCartPage } from 'pages/ShoppingCartPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRoutePathMain(),
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRoutePathAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: getRoutePathProfile(':id'),
        element: <ProfilePage />,
        authOnly: false,
    },
    [AppRoutes.ARTICLES]: {
        path: getRoutePathArticles(),
        element: <ArticlesPage />,
        authOnly: false,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRoutePathArticlesDetailsById(':id'),
        element: <ArticleDetailsPage />,
        authOnly: false,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: getRoutePathArticlesCreate(),
        element: <ArticleDetailsPage />,
        authOnly: false,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: getRoutePathArticlesEditById(':id'),
        element: <ArticleDetailsEditPage />,
        authOnly: false,
    },
    [AppRoutes.PRODUCTS]: {
        path: getRoutePathProducts(),
        element: <ProductsPage />,
    },
    [AppRoutes.SHOPPING_CART]: {
        path: getRoutePathShoppingCart(),
        element: <ShoppingCartPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};

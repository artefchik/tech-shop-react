import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { ProfilePage } from 'pages/ProfilePage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticleDetailsEditPage } from 'pages/ArticleDetailsEditPage';
import { NotFoundPage } from 'pages/NotFoundPage/ui/NotFoundPage';
import {
    AppRoutes,
    getRoutePathAbout,
    getRoutePathArticles,
    getRoutePathArticlesCreate,
    getRoutePathArticlesDetailsById,
    getRoutePathArticlesEditById,
    getRoutePathAuth,
    getRoutePathFavorites,
    getRoutePathMain,
    getRoutePathProductDetailsById,
    getRoutePathProducts,
    getRoutePathProductsCategories,
    getRoutePathProfile,
    getRoutePathShoppingCart,
    RoutePath,
} from 'shared/const/router';
import { ProductsPage } from 'pages/ProductsPage';
import { ShoppingCartPage } from 'pages/ShoppingCartPage';
import { ProductsCategoriesPage } from 'pages/ProductsCategoriesPage';
import { RouteProps } from 'react-router-dom';
import { UserRoles } from 'entities/User';
import { SandboxPage } from 'pages/SandboxPage';
import { AuthPage } from 'pages/AuthPage';
import { FavoritesPage } from 'pages/FavoritesPage';
import { ProductDetailsPage } from 'pages/ProductDetailsPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
};

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
    },
    [AppRoutes.ARTICLES]: {
        path: getRoutePathArticles(),
        element: <ArticlesPage />,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRoutePathArticlesDetailsById(':id'),
        element: <ArticleDetailsPage />,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: getRoutePathArticlesCreate(),
        element: <SandboxPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: getRoutePathArticlesEditById(':id'),
        element: <ArticleDetailsEditPage />,
        authOnly: true,
        // roles: [UserRoles.ADMIN],
    },
    [AppRoutes.PRODUCTS]: {
        path: getRoutePathProducts(),
        element: <ProductsCategoriesPage />,
    },
    [AppRoutes.PRODUCTS_DETAILS]: {
        path: getRoutePathProductDetailsById(':category', ':id'),
        element: <ProductDetailsPage />,
    },
    [AppRoutes.PRODUCTS_CATEGORIES]: {
        path: getRoutePathProductsCategories(':category'),
        element: <ProductsPage />,
        // roles: [UserRoles.ADMIN],
    },
    [AppRoutes.SHOPPING_CART]: {
        path: getRoutePathShoppingCart(),
        element: <ShoppingCartPage />,
    },
    [AppRoutes.FAVORITES]: {
        path: getRoutePathFavorites(),
        element: <FavoritesPage />,
    },
    [AppRoutes.AUTH]: {
        path: getRoutePathAuth(),
        element: <AuthPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};

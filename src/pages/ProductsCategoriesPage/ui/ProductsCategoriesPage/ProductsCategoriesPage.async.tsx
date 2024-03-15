import { lazy } from 'react';

export const ProductsCategoriesPageAsync = lazy(
    () => import('./ProductsCategoriesPage'),
);

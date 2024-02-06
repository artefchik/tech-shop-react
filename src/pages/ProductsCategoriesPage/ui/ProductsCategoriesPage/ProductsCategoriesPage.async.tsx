import { lazy } from 'react';

export const ProductsCategoriesPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            // for the loader
            setTimeout(() => resolve(import('./ProductsCategoriesPage')), 400);
        }),
);

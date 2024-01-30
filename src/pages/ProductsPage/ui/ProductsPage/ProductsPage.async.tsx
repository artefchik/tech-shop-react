import { lazy } from 'react';

export const ProductsPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            // for the loader
            setTimeout(() => resolve(import('./ProductsPage')), 400);
        }),
);

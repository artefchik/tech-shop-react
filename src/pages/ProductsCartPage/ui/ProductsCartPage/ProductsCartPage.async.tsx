import { lazy } from 'react';

export const ProductsCartPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            // for the loader
            setTimeout(() => resolve(import('./ProductsCartPage')), 1500);
        }),
);

import { lazy } from 'react';

export const ShoppingCartPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            // for the loader
            setTimeout(() => resolve(import('./ShoppingCartPage')), 1500);
        }),
);

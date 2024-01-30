import { lazy } from 'react';

export const ProductDetailsPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            // for the loader
            setTimeout(() => resolve(import('./ProductDetailsPage')), 1500);
        }),
);

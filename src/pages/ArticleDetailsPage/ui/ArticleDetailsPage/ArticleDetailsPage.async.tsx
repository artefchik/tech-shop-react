import { lazy } from 'react';

export const ArticleDetailsPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // for the loader
    setTimeout(() => resolve(import('./ArticleDetailsPage')), 1500);
}));

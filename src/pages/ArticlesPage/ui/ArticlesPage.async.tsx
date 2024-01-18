import { lazy } from 'react';

export const ArticlesPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // for the loader
    setTimeout(() => resolve(import('./ArticlesPage')), 1500);
}));

import { lazy } from 'react';

export const OfferedArticlesPageAsync = lazy(
    () => import('./OfferedArticlesPage'),
);

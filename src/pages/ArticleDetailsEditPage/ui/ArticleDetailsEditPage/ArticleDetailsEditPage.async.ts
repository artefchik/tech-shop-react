import { lazy } from 'react';

export const ArticleDetailsEditPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            // for the loader
            setTimeout(() => resolve(import('./ArticleDetailsEditPage')), 1500);
        }),
);

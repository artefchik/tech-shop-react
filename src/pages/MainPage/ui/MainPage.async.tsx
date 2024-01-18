import { lazy } from 'react';

export const MainPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // for the loader
    setTimeout(() => resolve(import('./MainPage')), 1500);
}));

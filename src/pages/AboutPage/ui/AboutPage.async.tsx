import { lazy } from 'react';

export const AboutPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // for the loader
    setTimeout(() => resolve(import('./AboutPage')), 1500);
}));

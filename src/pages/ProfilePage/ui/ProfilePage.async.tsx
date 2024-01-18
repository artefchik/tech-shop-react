import { lazy } from 'react';

export const ProfilePageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // for the loader
    setTimeout(() => resolve(import('./ProfilePage')), 1500);
}));

import { lazy } from 'react';

export const SandboxPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            // for the loader
            setTimeout(() => resolve(import('./SandboxPage')), 1500);
        }),
);

import { lazy } from 'react';

export const SignUpFormAsync = lazy(() => import('./SignUpForm'));

// export const LoginFormAsync = lazy(
//     () =>
//         new Promise((resolve) => {
//             // @ts-ignore
//             // for the loader
//             setTimeout(() => resolve(import('./LoginForm')), 1500);
//         }),
// );

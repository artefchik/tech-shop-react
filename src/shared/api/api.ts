import axios, { AxiosRequestConfig } from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { AuthResponse } from 'features/AuthByUsername/model/types/loginSchema';

export const $api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000',
});
//
$api.interceptors.request.use((config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (accessToken) {
        if (config.headers) {
            config.headers.Authorization = `Bearer ${localStorage.getItem(USER_LOCALSTORAGE_KEY)}`;
            return config;
        }
    }
    // @ts-ignore
});
// $api.interceptors.response.use(
//     (config) => config,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !error.config._isRetry) {
//             originalRequest._isRetry = true;
//             try {
//                 const response = await axios.get<AuthResponse>(
//                     'http://localhost:8000/refresh',
//                     {
//                         withCredentials: true,
//                     },
//                 );
//                 localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.accessToken);
//                 return $api.request(originalRequest);
//             } catch (e) {
//                 console.log(e);
//             }
//         }
//     },
// );

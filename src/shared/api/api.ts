import axios, { AxiosRequestConfig } from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { AuthResponse } from 'entities/User';
import * as process from 'process';

export const $api = axios.create({
    withCredentials: true,
    baseURL: __API__,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (accessToken) {
        if (config.headers) {
            config.headers.Authorization = `Bearer ${localStorage.getItem(USER_LOCALSTORAGE_KEY)}`;
            return config;
        }
    }
    return config;
});
$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<AuthResponse>(
                    `${__API__}/refresh`,
                    {
                        withCredentials: true,
                    },
                );
                localStorage.setItem(
                    USER_LOCALSTORAGE_KEY,
                    response.data.accessToken,
                );
                return $api.request(originalRequest);
            } catch (e) {
                console.log(e);
            }
        }
        throw error;
    },
);

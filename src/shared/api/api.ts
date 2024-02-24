import axios from 'axios';

export const $api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000',
});
$api.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
});
$api.interceptors.response.use(
    (config) => config,
    (error) => {},
);

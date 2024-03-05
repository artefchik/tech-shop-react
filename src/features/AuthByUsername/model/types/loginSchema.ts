import { User } from 'entities/User';

export interface LoginSchema {
    email: string | undefined;
    username?: string | undefined;
    password: string | undefined;
    isLoading: boolean;
    error?: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

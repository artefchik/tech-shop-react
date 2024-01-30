export interface LoginSchema {
    username: string | undefined;
    password: string | undefined;
    isLoading: boolean;
    error?: string;
}

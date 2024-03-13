export enum UserRoles {
    ADMIN = 'admin',
    USER = 'user',
}

export interface User {
    id: string;
    username?: string;
    email: string;
    avatar?: string;
    roles: UserRoles;
    isActivatedEmail: boolean;
}
export interface UserSchema {
    authData?: User;
    _mounted: boolean;
    error?: string;
}
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

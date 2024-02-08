export enum UserRoles {
    ADMIN = 'admin',
    USER = 'user',
}

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles: UserRoles;
}
export interface UserSchema {
    authData?: User;
    _mounted: boolean;
    error?: string;
}

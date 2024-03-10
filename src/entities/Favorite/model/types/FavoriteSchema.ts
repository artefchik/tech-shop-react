export interface Favorite {
    id: string;
    userId: string;
}

export interface FavoriteSchema {
    data?: Favorite;
    error?: string;
}

import { StateSchema } from 'app/providers/StoreProvider';

export const getFavoritesItems = (state: StateSchema) =>
    state.productFavorites.favoritesItems ?? [];

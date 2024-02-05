import { StateSchema } from 'app/providers/StoreProvider';

export const getProductFavoritesIsLoading = (state: StateSchema) =>
    state.productFavorites.isLoading;

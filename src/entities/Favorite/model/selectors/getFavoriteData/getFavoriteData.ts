import { StateSchema } from 'app/providers/StoreProvider';

export const getFavoriteData = (state: StateSchema) => state.favorite.data;

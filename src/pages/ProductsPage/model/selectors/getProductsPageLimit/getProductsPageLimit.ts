import { StateSchema } from 'app/providers/StoreProvider';

export const getProductsPageLimit = (state: StateSchema) =>
    state.productsPage?.limit ?? 7;

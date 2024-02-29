import { StateSchema } from 'app/providers/StoreProvider';

export const getProductsPageHasMore = (state: StateSchema) =>
    state.productsPage?.hasMore ?? true;

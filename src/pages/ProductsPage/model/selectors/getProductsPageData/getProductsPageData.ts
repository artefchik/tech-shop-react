import { StateSchema } from 'app/providers/StoreProvider';

export const getProductsPageData = (state: StateSchema) =>
    state.productsPage?.data ?? [];

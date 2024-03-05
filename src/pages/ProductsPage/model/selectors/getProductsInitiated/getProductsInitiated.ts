import { StateSchema } from 'app/providers/StoreProvider';

export const getProductsInitiated = (state: StateSchema) =>
    state.productsPage?._initiated ?? false;

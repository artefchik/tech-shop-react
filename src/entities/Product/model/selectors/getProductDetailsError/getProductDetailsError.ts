import { StateSchema } from 'app/providers/StoreProvider';

export const getProductDetailsError = (state: StateSchema) =>
    state.productDetails?.error ?? '';

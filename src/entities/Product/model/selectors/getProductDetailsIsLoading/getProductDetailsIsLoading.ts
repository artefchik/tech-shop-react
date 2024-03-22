import { StateSchema } from 'app/providers/StoreProvider';

export const getProductDetailsIsLoading = (state: StateSchema) =>
    state.productDetails?.isLoading ?? false;

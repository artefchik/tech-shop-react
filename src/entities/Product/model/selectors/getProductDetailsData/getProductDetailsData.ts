import { StateSchema } from 'app/providers/StoreProvider';

export const getProductDetailsData = (state: StateSchema) =>
    state.productDetails?.data;

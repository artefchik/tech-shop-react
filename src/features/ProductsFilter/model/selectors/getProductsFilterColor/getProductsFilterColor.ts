import { StateSchema } from 'app/providers/StoreProvider';

export const getProductsFilterColor = (state: StateSchema) =>
    state.productsFilters?.color ?? '';

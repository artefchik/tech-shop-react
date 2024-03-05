import { StateSchema } from 'app/providers/StoreProvider';

export const getProductsFilterModel = (state: StateSchema) =>
    state.productsFilters?.model ?? '';

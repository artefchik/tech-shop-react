import { StateSchema } from 'app/providers/StoreProvider';

export const getProductsFilterBrand = (state: StateSchema) =>
    state.productsFilters?.brand ?? '';

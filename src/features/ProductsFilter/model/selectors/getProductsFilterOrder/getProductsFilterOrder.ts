import { StateSchema } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/const/types';

export const getProductsFilterOrder = (state: StateSchema) =>
    state.productsFilters?.order ?? SortOrder.ASK;

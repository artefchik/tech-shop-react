import { StateSchema } from 'app/providers/StoreProvider';

export const getProductsListPage = (state: StateSchema) => state.productsPage?.page ?? 1;

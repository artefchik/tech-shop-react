import { StateSchema } from 'app/providers/StoreProvider';
import { ProductsCategories } from 'shared/const/types';

export const getProductsCategory = (state: StateSchema) =>
    state.productsPage?.category ?? ProductsCategories.ALL;

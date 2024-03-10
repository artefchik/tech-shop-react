import { StateSchema } from 'app/providers/StoreProvider';
import { ViewType } from 'shared/const/types';

export const getProductsPageView = (state: StateSchema) =>
    state.productsPage?.view || ViewType.SMALL;

import { StateSchema } from 'app/providers/StoreProvider';
import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';

export const getProductsPageView = (state: StateSchema) =>
    state.productsPage?.view || ViewType.SMALL;

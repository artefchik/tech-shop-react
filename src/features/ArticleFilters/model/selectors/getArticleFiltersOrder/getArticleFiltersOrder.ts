import { StateSchema } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/const/types';

export const getArticleFiltersOrder = (state: StateSchema) =>
    state.articleFilters?.order || SortOrder.DESC;

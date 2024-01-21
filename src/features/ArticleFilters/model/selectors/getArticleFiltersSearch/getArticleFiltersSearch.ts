import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleFiltersSearch = (state:StateSchema) => state.articleFilters?.search || '';

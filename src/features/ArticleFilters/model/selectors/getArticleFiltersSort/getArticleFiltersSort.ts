import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleFiltersSort = (state:StateSchema) => state.articleFilters?.sort;

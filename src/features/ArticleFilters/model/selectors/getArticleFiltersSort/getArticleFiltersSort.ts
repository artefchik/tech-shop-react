import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleSortField } from 'features/ArticleFilters/model/types/filters';

export const getArticleFiltersSort = (state:StateSchema) => state.articleFilters?.sort || ArticleSortField.CREATED;

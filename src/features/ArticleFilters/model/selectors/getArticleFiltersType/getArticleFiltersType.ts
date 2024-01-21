import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleType } from 'entities/Article';

export const getArticleFiltersType = (state:StateSchema) => state.articleFilters?.type || ArticleType.ALL;
